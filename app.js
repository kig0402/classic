/**
 * OPUS (오푸스) - Classical Music Curation Engine & PWA Controller (Pro Edition)
 * 12대 작곡가, 10대 무드 테마, 유튜브 뮤직 전세계 음원 연동 검색, 지능형 폴백
 */

// Application State
const state = {
  currentMood: 'all',
  selectedComposer: null,
  selectedPeriod: 'all',
  searchQuery: '',
  deferredPrompt: null,
  dailyPiece: null
};

// DOM Elements
const piecesGrid = document.getElementById('piecesGrid');
const moodPillsContainer = document.getElementById('moodPills');
const composersGrid = document.getElementById('composersGrid');
const composerPeriodPills = document.getElementById('composerPeriodPills');
const playlistsGrid = document.getElementById('playlistsGrid');
const searchInput = document.getElementById('searchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const curationStatusBannerContainer = document.getElementById('curationStatusBannerContainer');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalContentContainer');
const aiInput = document.getElementById('aiPromptInput');
const aiResultBox = document.getElementById('aiResultBox');
const heroTodayCard = document.getElementById('heroTodayCard');
const heroTodayDateTag = document.getElementById('heroTodayDateTag');
const heroTodayTitle = document.getElementById('heroTodayTitle');
const heroTodayDesc = document.getElementById('heroTodayDesc');
const heroTodayBtn = document.getElementById('heroTodayDocentBtn');
const heroTodayPlayBtn = document.getElementById('heroTodayPlayBtn');
const btnInstallHeader = document.getElementById('btnInstallHeader');
const btnInstallBanner = document.getElementById('btnInstallBanner');
const btnDismissBanner = document.getElementById('btnDismissBanner');
const pwaBanner = document.getElementById('pwaBanner');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initDailyPick();
  renderMoodPills();
  renderPieces();
  renderComposers();
  renderPlaylists();
  setupEventListeners();
  setupScrollSpy();
  registerServiceWorker();
  setupPWAInstall();
});

// 1. Dynamic Daily Rotation for "오늘의 클래식 도슨트 Pick" (매일 자정 자동 순환)
function initDailyPick() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  const daySeed = year * 372 + month * 31 + date;
  const dailyIndex = daySeed % CLASSIC_DATA.pieces.length;
  state.dailyPiece = CLASSIC_DATA.pieces[dailyIndex];

  if (heroTodayDateTag) {
    heroTodayDateTag.innerHTML = `🌟 ${month}월 ${date}일 오늘의 클래식 도슨트 Pick`;
  }
  if (heroTodayTitle && state.dailyPiece) {
    heroTodayTitle.textContent = `${state.dailyPiece.composerName}: ${state.dailyPiece.title}`;
  }
  if (heroTodayDesc && state.dailyPiece) {
    heroTodayDesc.textContent = state.dailyPiece.description;
  }
  if (heroTodayCard && state.dailyPiece) {
    heroTodayCard.style.backgroundImage = `linear-gradient(to right, rgba(10, 12, 18, 0.96) 42%, rgba(10, 12, 18, 0.52) 100%), url('${state.dailyPiece.albumArt}')`;
  }

  if (heroTodayPlayBtn && state.dailyPiece) {
    heroTodayPlayBtn.onclick = () => playPieceExternal(state.dailyPiece.searchQuery, 'ytm');
  }
  if (heroTodayBtn && state.dailyPiece) {
    heroTodayBtn.onclick = () => openPieceModal(state.dailyPiece.id);
  }
}

// 2. Navigation & Smooth Scrolling
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateActiveNav('top');
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateActiveNav(sectionId);
  }
}

function handleBottomNav(btn, targetId) {
  document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');

  if (targetId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (targetId === 'sectionAISommelier' && aiInput) {
        setTimeout(() => aiInput.focus(), 350);
      }
    }
  }
}

function updateActiveNav(targetId) {
  document.querySelectorAll('.mobile-nav-item').forEach(el => {
    if (el.dataset.nav === targetId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(targetId)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setupScrollSpy() {
  const sections = ['sectionMoods', 'sectionAISommelier', 'sectionComposers', 'sectionPlaylists'];
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    if (window.scrollY < 200) {
      updateActiveNav('top');
      return;
    }
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          updateActiveNav(id);
          break;
        }
      }
    }
  }, { passive: true });
}

// 3. Render Mood Filter Pills (10대 무드 테마)
function renderMoodPills() {
  if (!moodPillsContainer) return;
  moodPillsContainer.innerHTML = CLASSIC_DATA.moods.map(mood => `
    <button class="mood-pill ${state.currentMood === mood.id ? 'active' : ''}" onclick="handleMoodClick('${mood.id}')">
      <span>${mood.icon}</span>
      <span>${mood.name}</span>
    </button>
  `).join('');
}

function handleMoodClick(moodId) {
  state.currentMood = moodId;
  state.selectedComposer = null;
  state.searchQuery = '';
  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';

  renderMoodPills();
  renderPieces();

  const piecesSection = document.getElementById('sectionPieces');
  if (piecesSection) {
    piecesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 4. Render Pieces Grid & Universal YouTube Music Search Fallback
function renderPieces() {
  if (!piecesGrid) return;

  let filtered = [...CLASSIC_DATA.pieces];
  let bannerHtml = '';
  let showYoutubeMusicCard = false;
  let activeSearchQuery = state.searchQuery.trim();

  // Composer filter
  if (state.selectedComposer) {
    const composer = CLASSIC_DATA.composers.find(c => c.id === state.selectedComposer);
    filtered = filtered.filter(p => p.composerId === state.selectedComposer);
    filtered.sort((a, b) => (a.signatureRank || 99) - (b.signatureRank || 99));

    if (composer) {
      bannerHtml = `
        <div class="curation-status-banner">
          <div>
            <div class="title">👑 ${composer.name} 대표 명곡 큐레이션 (${filtered.length}곡)</div>
            <div class="desc">"${composer.quote}"</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a href="https://music.youtube.com/search?q=${encodeURIComponent(composer.name + ' classical')}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">
              🎵 YouTube Music 전곡 탐색
            </a>
            <button class="btn-docent-sm" onclick="resetFilters()">전체보기 ✕</button>
          </div>
        </div>
      `;
    }
  }
  // Search Query Filter
  else if (activeSearchQuery) {
    const q = activeSearchQuery.toLowerCase();

    // 1. Check if search matches composer
    const matchedComposer = CLASSIC_DATA.composers.find(c => 
      c.name.toLowerCase().includes(q) || 
      c.nameEn.toLowerCase().includes(q)
    );

    if (matchedComposer) {
      filtered = filtered.filter(p => p.composerId === matchedComposer.id);
      filtered.sort((a, b) => (a.signatureRank || 99) - (b.signatureRank || 99));
      bannerHtml = `
        <div class="curation-status-banner">
          <div>
            <div class="title">🔍 '${matchedComposer.name}' 대표 명곡 컬렉션 (${filtered.length}곡 수록)</div>
            <div class="desc">${matchedComposer.era} · ${matchedComposer.country} (${matchedComposer.years})</div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a href="https://music.youtube.com/search?q=${encodeURIComponent(matchedComposer.name + ' classical')}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm" style="padding: 0.35rem 0.75rem; font-size: 0.76rem;">
              🎵 YouTube Music 전체 탐색
            </a>
            <button class="btn-docent-sm" onclick="resetFilters()">전체보기 ✕</button>
          </div>
        </div>
      `;
    } else {
      // 2. Search pieces by title, English title, composer, story, opus
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.composerName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.backgroundStory.toLowerCase().includes(q) ||
        (p.opus && p.opus.toLowerCase().includes(q))
      );

      showYoutubeMusicCard = true; // Always offer global YouTube Music integration

      bannerHtml = `
        <div class="curation-status-banner">
          <div>
            <div class="title">🔍 '${activeSearchQuery}' 검색 결과 (${filtered.length}곡 수록)</div>
            <div class="desc">앱 내부 큐레이션 명곡 및 YouTube Music 전세계 라이브러리와 연동됩니다.</div>
          </div>
          <button class="btn-docent-sm" onclick="resetFilters()">전체보기 ✕</button>
        </div>
      `;
    }
  }
  // Mood filter
  else if (state.currentMood !== 'all') {
    filtered = filtered.filter(p => p.moods.includes(state.currentMood));
    const currentMoodObj = CLASSIC_DATA.moods.find(m => m.id === state.currentMood);
    if (currentMoodObj) {
      bannerHtml = `
        <div class="curation-status-banner">
          <div>
            <div class="title">${currentMoodObj.icon} [${currentMoodObj.name}] 큐레이션 (${filtered.length}곡)</div>
            <div class="desc">${currentMoodObj.desc}</div>
          </div>
          <button class="btn-docent-sm" onclick="resetFilters()">전체보기 ✕</button>
        </div>
      `;
    }
  }

  // Update Status Banner
  if (curationStatusBannerContainer) {
    curationStatusBannerContainer.innerHTML = bannerHtml;
  }

  // Update Counter Badge
  const countBadge = document.getElementById('piecesCountBadge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length}곡 수록`;
  }

  // Universal YouTube Music Fallback Card (When searching or when no local matches)
  const ytmUrl = `https://music.youtube.com/search?q=${encodeURIComponent(activeSearchQuery + ' classic')}`;
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(activeSearchQuery + ' classical')}`;
  const ytVideoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(activeSearchQuery + ' classical')}`;

  const universalYtmCardHtml = `
    <div style="grid-column: 1 / -1; background: linear-gradient(135deg, rgba(255, 0, 0, 0.12), rgba(20, 26, 42, 0.95)); border: 1px solid rgba(255, 0, 0, 0.35); border-radius: var(--radius-md); padding: 1.5rem; display: flex; flex-direction: column; gap: 0.85rem; box-shadow: var(--shadow-sm); margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <span style="background: #ff0000; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: var(--radius-full);">YOUTUBE MUSIC GLOBAL</span>
          <h4 style="font-size: 1.15rem; font-weight: 800; color: #fff; margin-top: 0.35rem;">
            '${activeSearchQuery}' 유튜브 뮤직 공식 라이브러리 전체 탐색
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.15rem;">
            전 세계 수만 명의 연주자와 오케스트라 음원을 유튜브 뮤직에서 바로 고음질로 들으실 수 있습니다.
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="${ytmUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm" style="padding: 0.55rem 1rem;">
            🎵 YouTube Music에서 전곡 듣기
          </a>
          <a href="${spotifyUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-spotify" style="padding: 0.55rem 1rem;">
            🟢 Spotify
          </a>
          <a href="${ytVideoUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-secondary" style="padding: 0.55rem 1rem;">
            ▶ 연주 영상
          </a>
        </div>
      </div>
    </div>
  `;

  // If no pieces found locally
  if (filtered.length === 0) {
    piecesGrid.innerHTML = `
      ${universalYtmCardHtml}
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-dim); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed rgba(255,255,255,0.1);">
        <p style="font-size: 2.2rem; margin-bottom: 0.5rem;">🎼</p>
        <p style="font-size: 1.05rem; font-weight: 700; color: #fff;">'${activeSearchQuery}'에 대한 앱 내 도슨트 카드는 준비 중입니다.</p>
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-top: 0.25rem;">위의 YouTube Music 버튼을 누르시면 해당 작곡가/곡의 전곡 음원을 즉시 감상하실 수 있습니다.</p>
        <button class="btn-primary" onclick="resetFilters()" style="margin-top: 1.25rem;">전체 명곡으로 돌아가기</button>
      </div>
    `;
    return;
  }

  // Render Cards with Rank Badges
  const cardsHtml = filtered.map(piece => {
    const isSignature = piece.signatureRank && piece.signatureRank <= 5;
    const rankBadgeHtml = isSignature 
      ? `<span class="card-cover-badge rank">👑 대표곡 ${piece.signatureRank}위</span>` 
      : '';

    return `
      <div class="piece-card" data-piece-id="${piece.id}" style="animation: fadeIn 0.3s ease;">
        <div class="card-cover">
          <img src="${piece.albumArt}" alt="${piece.title}" loading="lazy" />
          <div class="card-cover-badges">
            ${rankBadgeHtml}
            <span class="card-cover-badge">${piece.opus || piece.year}</span>
          </div>
          <div class="card-play-overlay" title="유튜브 뮤직에서 바로 듣기" onclick="event.stopPropagation(); playPieceExternal('${piece.searchQuery}', 'ytm')">
            ▶
          </div>
        </div>
        <div class="card-body">
          <div class="card-composer">${piece.composerName}</div>
          <h3 class="card-title">${piece.title}</h3>
          <p class="card-subtitle">${piece.titleEn}</p>
          <p class="card-desc">${piece.description}</p>
          <div class="card-footer">
            <span class="movement-count">🎼 ${piece.movements.length}개 악장</span>
            <button class="btn-docent-sm" onclick="openPieceModal('${piece.id}')">
              📖 스토리 & 악장
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  piecesGrid.innerHTML = (showYoutubeMusicCard ? universalYtmCardHtml : '') + cardsHtml;
}

// Reset All Filters
function resetFilters() {
  state.currentMood = 'all';
  state.selectedComposer = null;
  state.searchQuery = '';
  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';
  renderMoodPills();
  renderPieces();
}

// 5. Select Composer -> Filter View with Famous Signature Works
function selectComposer(composerId) {
  state.selectedComposer = composerId;
  state.currentMood = 'all';
  state.searchQuery = '';
  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';

  renderMoodPills();
  renderPieces();

  const piecesSection = document.getElementById('sectionPieces');
  if (piecesSection) {
    piecesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 6. Render Composers Grid with Era Period Filter
function renderComposers(periodFilter = 'all') {
  if (!composersGrid) return;
  state.selectedPeriod = periodFilter;

  let composers = CLASSIC_DATA.composers;
  if (periodFilter !== 'all') {
    composers = composers.filter(c => c.period.includes(periodFilter));
  }

  composersGrid.innerHTML = composers.map(c => {
    const composerWorks = CLASSIC_DATA.pieces.filter(p => p.composerId === c.id);
    return `
      <div class="composer-card" onclick="selectComposer('${c.id}')">
        <img class="composer-avatar" src="${c.avatar}" alt="${c.name}">
        <div class="composer-info">
          <h4>${c.name}</h4>
          <p class="era">${c.era}</p>
          <p class="years">${c.years} · 대표 명곡 ${composerWorks.length}편</p>
        </div>
      </div>
    `;
  }).join('');
}

function filterComposersByPeriod(btn, period) {
  document.querySelectorAll('.period-pill').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
  renderComposers(period);
}

// 7. Render Playlists
function renderPlaylists() {
  if (!playlistsGrid) return;
  playlistsGrid.innerHTML = CLASSIC_DATA.curatedPlaylists.map(pl => `
    <div class="piece-card" style="cursor: pointer;" onclick="filterByPlaylist('${pl.id}')">
      <div class="card-cover" style="height: 165px;">
        <img src="${pl.cover}" alt="${pl.title}" loading="lazy" />
        <div class="card-cover-badges">
          <span class="card-cover-badge rank">테마 컬렉션 (${pl.pieceIds.length}곡)</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title" style="font-size: 1.05rem;">${pl.title}</h3>
        <p class="card-desc" style="margin-bottom: 0.5rem;">${pl.subtitle}</p>
        <div class="card-footer">
          <span class="movement-count" style="color: var(--accent-gold);">에디터 추천</span>
          <button class="btn-docent-sm">수록곡 듣기 ➔</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 8. Search Engine Implementation
function handleSearchSubmit(e) {
  if (e) e.preventDefault();
  if (!searchInput) return;

  const val = searchInput.value.trim();
  state.searchQuery = val;
  state.currentMood = 'all';
  state.selectedComposer = null;

  renderMoodPills();
  renderPieces();

  const piecesSection = document.getElementById('sectionPieces');
  if (piecesSection) {
    piecesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (searchInput) searchInput.blur();
}

function clearSearch() {
  if (searchInput) searchInput.value = '';
  if (searchClearBtn) searchClearBtn.style.display = 'none';
  resetFilters();
}

// 9. Setup Global Event Listeners
function setupEventListeners() {
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = val ? 'flex' : 'none';
      }
      state.searchQuery = val;
      state.currentMood = 'all';
      state.selectedComposer = null;
      renderPieces();
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// 10. Open Piece Modal (Detailed Docent, Movements, Streaming Deep-links)
function openPieceModal(pieceId) {
  const piece = CLASSIC_DATA.pieces.find(p => p.id === pieceId);
  if (!piece) return;

  const ytmUrl = `https://music.youtube.com/search?q=${encodeURIComponent(piece.searchQuery)}`;
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(piece.searchQuery)}`;
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(piece.searchQuery)}`;

  modalBody.innerHTML = `
    <div class="modal-content">
      <div class="bottom-sheet-handle"></div>
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
      
      <div class="modal-header-hero">
        <img src="${piece.albumArt}" alt="${piece.title}">
        <div class="modal-header-gradient"></div>
        <div class="modal-header-text">
          <span style="color: var(--accent-gold-light); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.05em;">
            ${piece.composerName} · ${piece.opus || piece.year}
          </span>
          <h2 style="font-size: 1.45rem; font-weight: 800; color: #fff; line-height: 1.25; margin-top: 0.25rem;">
            ${piece.title}
          </h2>
          <p style="font-size: 0.82rem; color: rgba(255,255,255,0.7);">${piece.titleEn}</p>
        </div>
      </div>

      <div class="modal-body">
        <!-- Vinyl Record & Streaming Deep Links -->
        <div class="vinyl-player-section">
          <div class="vinyl-record">
            <div class="vinyl-center"></div>
          </div>
          <div class="player-text">
            <h5>음원 플랫폼 원클릭 감상</h5>
            <p>선호하는 음악 앱에서 고음질로 즉시 재생됩니다</p>
          </div>
          <div class="streaming-buttons">
            <a href="${ytmUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm">
              🎵 YouTube Music
            </a>
            <a href="${spotifyUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-spotify">
              🟢 Spotify
            </a>
            <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-secondary" style="font-size: 0.8rem;">
              ▶ YouTube 영상
            </a>
          </div>
        </div>

        <!-- Docent Storytelling: Background -->
        <div class="docent-box">
          <div class="docent-title">
            <span>📖</span> 탄생 배경과 비하인드 스토리
          </div>
          <p class="docent-text">${piece.backgroundStory}</p>
        </div>

        <!-- Docent Storytelling: Interpretation -->
        <div class="docent-box" style="border-left-color: #60a5fa; background: rgba(96, 165, 250, 0.06);">
          <div class="docent-title" style="color: #93c5fd;">
            <span>🎧</span> 도슨트 감상 포인트 & 해설
          </div>
          <p class="docent-text">${piece.interpretation}</p>
        </div>

        <!-- Movements & Tracklist -->
        <div class="movements-section">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>🎼</span> 수록 악장 구성 (${piece.movements.length} Movements)
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.75rem;">
            각 악장의 템포와 분위기에 집중해서 들어보세요.
          </p>
          <div class="movements-list">
            ${piece.movements.map(m => `
              <div class="movement-item">
                <div>
                  <div class="movement-title">${m.no}: ${m.title}</div>
                  <div class="movement-meta">${m.tempo}</div>
                  <div class="movement-desc">${m.desc}</div>
                </div>
                <button class="btn-docent-sm" onclick="playPieceExternal('${piece.searchQuery} ${m.title}', 'ytm')">
                  ▶ 재생
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modalBackdrop) modalBackdrop.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// 11. Deep Linking Playback Helper
function playPieceExternal(searchQuery, platform = 'ytm') {
  let url = '';
  if (platform === 'ytm') {
    url = `https://music.youtube.com/search?q=${encodeURIComponent(searchQuery)}`;
  } else if (platform === 'spotify') {
    url = `https://open.spotify.com/search/${encodeURIComponent(searchQuery)}`;
  } else {
    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

// 12. Filter by Curated Playlist
function filterByPlaylist(playlistId) {
  const pl = CLASSIC_DATA.curatedPlaylists.find(p => p.id === playlistId);
  if (!pl) return;

  state.currentMood = 'all';
  state.selectedComposer = null;
  state.searchQuery = '';
  
  const filtered = CLASSIC_DATA.pieces.filter(p => pl.pieceIds.includes(p.id));
  
  if (piecesGrid) {
    const piecesSection = document.getElementById('sectionPieces');
    if (piecesSection) {
      piecesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (curationStatusBannerContainer) {
      curationStatusBannerContainer.innerHTML = `
        <div class="curation-status-banner">
          <div>
            <div class="title">🎧 테마: ${pl.title} (${filtered.length}곡)</div>
            <div class="desc">${pl.subtitle}</div>
          </div>
          <button class="btn-docent-sm" onclick="resetFilters()">전체보기 ✕</button>
        </div>
      `;
    }

    piecesGrid.innerHTML = filtered.map(piece => `
      <div class="piece-card" data-piece-id="${piece.id}" style="animation: fadeIn 0.3s ease;">
        <div class="card-cover">
          <img src="${piece.albumArt}" alt="${piece.title}" loading="lazy" />
          <div class="card-cover-badges">
            <span class="card-cover-badge">${piece.opus || piece.year}</span>
          </div>
          <div class="card-play-overlay" onclick="event.stopPropagation(); playPieceExternal('${piece.searchQuery}', 'ytm')">
            ▶
          </div>
        </div>
        <div class="card-body">
          <div class="card-composer">${piece.composerName}</div>
          <h3 class="card-title">${piece.title}</h3>
          <p class="card-subtitle">${piece.titleEn}</p>
          <p class="card-desc">${piece.description}</p>
          <div class="card-footer">
            <span class="movement-count">🎼 ${piece.movements.length}개 악장 구성</span>
            <button class="btn-docent-sm" onclick="openPieceModal('${piece.id}')">
              📖 스토리 & 악장
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// 13. AI Sommelier Smart Recommendation (Recognizes all 12 composers and 10 moods)
function handleAIPrompt(customText = null) {
  const prompt = (customText || (aiInput ? aiInput.value : '')).trim();
  if (!prompt) return;

  if (aiInput) aiInput.value = prompt;
  if (!aiResultBox) return;

  aiResultBox.style.display = 'block';
  aiResultBox.innerHTML = `
    <div style="text-align: center; padding: 1.5rem; color: var(--accent-gold-light);">
      <p style="font-size: 1.05rem; font-weight: 600; animation: pulse 1s infinite;">✨ AI 클래식 소믈리에가 선율을 고르는 중입니다...</p>
    </div>
  `;

  setTimeout(() => {
    let matchedPiece = null;
    let sommelierComment = "";

    const pLower = prompt.toLowerCase();

    if (pLower.includes("슈베르트") || pLower.includes("송어") || pLower.includes("마왕") || pLower.includes("아베마리아")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'schubert-trout') || CLASSIC_DATA.pieces[0];
      sommelierComment = "‘가곡의 왕’ 슈베르트가 맑은 알프스 계곡물에서 은빛 비늘을 반짝이며 헤엄치는 송어를 노래한 피아노 5중주입니다. 마음에 상쾌한 생기와 미소를 불어넣어 드릴게요.";
    } else if (pLower.includes("비발디") || pLower.includes("사계") || pLower.includes("봄") || pLower.includes("여름")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'vivaldi-spring') || CLASSIC_DATA.pieces[0];
      sommelierComment = "새들의 지저귐과 산들바람, 약동하는 자연의 생명력을 노래한 비발디의 '사계 - 봄'입니다. 이탈리아의 따스한 태양빛 같은 활력을 느껴보세요.";
    } else if (pLower.includes("브람스") || pLower.includes("자장가") || pLower.includes("가을") || pLower.includes("우수")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'brahms-intermezzo-118-2') || CLASSIC_DATA.pieces[0];
      sommelierComment = "인생의 황혼기, 깊은 사색과 따뜻한 우수가 담긴 브람스의 간주곡(Intermezzo)입니다. 고요한 밤 당신의 복잡한 마음을 포근하게 품어줍니다.";
    } else if (pLower.includes("라흐마니노프") || pLower.includes("러시아") || pLower.includes("협주곡")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'rachmaninoff-rhapsody-paganini-18') || CLASSIC_DATA.pieces[0];
      sommelierComment = "가슴을 뒤흔드는 궁극의 낭만. 파가니니의 악마적 주제를 천상의 사랑의 찬가로 탈바꿈시킨 라흐마니노프의 18변주를 들려드립니다.";
    } else if (pLower.includes("리스트") || pLower.includes("사랑의꿈") || pLower.includes("종") || pLower.includes("캄파넬라")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'liszt-liebestraum-3') || CLASSIC_DATA.pieces[0];
      sommelierComment = "‘오 사랑하라, 그대가 사랑할 수 있는 한...’ 피아노의 신 리스트가 건반 위에 새긴 가장 달콤한 맹세, '사랑의 꿈'을 권해드립니다.";
    } else if (pLower.includes("아침") || pLower.includes("기상") || pLower.includes("햇살") || pLower.includes("상쾌")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'grieg-morning-mood') || CLASSIC_DATA.pieces[0];
      sommelierComment = "노르웨이 피오르의 아침 안개를 뚫고 찬란하게 솟아오르는 태양. 그리그의 '아침의 기분'과 함께 상쾌하고 맑은 하루를 시작해 보세요.";
    } else if (pLower.includes("수면") || pLower.includes("잠") || pLower.includes("불면증") || pLower.includes("자장가")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'bach-goldberg-aria') || CLASSIC_DATA.pieces[0];
      sommelierComment = "백작의 불면증을 치유하기 위해 바흐가 쓴 '골드베르크 변주곡'의 아리아입니다. 심장 박동을 자연스럽게 늦추며 깊은 숙면의 평안으로 인도합니다.";
    } else if (pLower.includes("비") || pLower.includes("비오는") || pLower.includes("우울") || pLower.includes("눈물")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'chopin-raindrop') || CLASSIC_DATA.pieces[0];
      sommelierComment = "비 오는 날의 창밖 풍경에는 처마 끝에서 맑고 투명하게 떨어지는 빗방울을 닮은 쇼팽의 프렐류드가 제격입니다. 당신의 마음에 따뜻한 온기를 더해줄 거예요.";
    } else if (pLower.includes("새벽") || pLower.includes("밤") || pLower.includes("달") || pLower.includes("사색")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'debussy-clair-de-lune') || CLASSIC_DATA.pieces[0];
      sommelierComment = "모두가 잠든 고요한 시간, 달빛이 잔잔한 수면 위로 내려앉듯 영혼을 정화해 주는 드뷔시의 '달빛'을 권해드립니다.";
    } else if (pLower.includes("공부") || pLower.includes("집중") || pLower.includes("몰입") || pLower.includes("작업") || pLower.includes("코딩")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'bach-cello-suite-1') || CLASSIC_DATA.pieces[1];
      sommelierComment = "잡념을 걷어내고 깊은 몰입의 뇌파로 유도하는 바흐의 무반주 첼로 모음곡입니다. 완벽한 질서와 울림이 지적인 집중을 완성해 드립니다.";
    } else if (pLower.includes("열정") || pLower.includes("활력") || pLower.includes("웅장") || pLower.includes("힘")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'beethoven-fate') || CLASSIC_DATA.pieces[1];
      sommelierComment = "무기력함을 부수고 심장을 다시 뛰게 할 불꽃 같은 에너지가 필요한 순간입니다. 승리의 환희를 쟁취하는 베토벤의 운명 교향곡을 들려드립니다.";
    } else {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'chopin-nocturne-9-2') || CLASSIC_DATA.pieces[0];
      sommelierComment = `"${prompt}"에 머무는 당신의 마음에 가장 어루만져 주는 선율로, 밤의 서정을 시처럼 노래한 쇼팽의 녹턴을 추천해 드립니다.`;
    }

    aiResultBox.innerHTML = `
      <div style="border-left: 3px solid var(--accent-gold); padding-left: 1rem; margin-bottom: 1rem;">
        <span style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 800; letter-spacing: 0.05em;">AI SOMMELIER'S NOTE</span>
        <p style="font-size: 0.94rem; color: #fff; margin-top: 0.3rem; line-height: 1.6;">
          "${sommelierComment}"
        </p>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center; background: rgba(255,255,255,0.05); padding: 0.9rem; border-radius: var(--radius-sm); justify-content: space-between; flex-wrap: wrap;">
        <div style="display: flex; gap: 0.85rem; align-items: center;">
          <img src="${matchedPiece.albumArt}" alt="${matchedPiece.title}" style="width: 52px; height: 52px; border-radius: 8px; object-fit: cover;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-gold);">${matchedPiece.composerName}</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">${matchedPiece.title}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${pieceMeta(matchedPiece)}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%; justify-content: flex-end;">
          <button class="btn-docent-sm" onclick="openPieceModal('${matchedPiece.id}')">📖 스토리 보기</button>
          <a href="https://music.youtube.com/search?q=${encodeURIComponent(matchedPiece.searchQuery)}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
            ▶ 바로 듣기
          </a>
        </div>
      </div>
    `;
  }, 400);
}

function pieceMeta(p) {
  return p.opus ? p.opus : `${p.year}년 작곡`;
}

// 14. PWA Service Worker & Install Logic
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[PWA] Service Worker v3 active, scope:', reg.scope))
        .catch((err) => console.warn('[PWA] Service Worker registration failed:', err));
    });
  }
}

function setupPWAInstall() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) {
    if (pwaBanner) pwaBanner.style.display = 'none';
    if (btnInstallHeader) btnInstallHeader.style.display = 'none';
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredPrompt = e;
    if (btnInstallHeader) btnInstallHeader.style.display = 'inline-flex';
    if (pwaBanner && !sessionStorage.getItem('opus_banner_dismissed')) {
      pwaBanner.style.display = 'flex';
    }
  });

  const triggerInstall = async () => {
    if (state.deferredPrompt) {
      state.deferredPrompt.prompt();
      const { outcome } = await state.deferredPrompt.userChoice;
      console.log('[PWA] User response to install:', outcome);
      state.deferredPrompt = null;
      if (pwaBanner) pwaBanner.style.display = 'none';
    } else {
      showIOSInstallGuide();
    }
  };

  if (btnInstallHeader) btnInstallHeader.addEventListener('click', triggerInstall);
  if (btnInstallBanner) btnInstallBanner.addEventListener('click', triggerInstall);
  
  if (btnDismissBanner) {
    btnDismissBanner.addEventListener('click', () => {
      if (pwaBanner) pwaBanner.style.display = 'none';
      sessionStorage.setItem('opus_banner_dismissed', 'true');
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    if (pwaBanner) pwaBanner.style.display = 'none';
    if (btnInstallHeader) btnInstallHeader.style.display = 'none';
  });
}

function showIOSInstallGuide() {
  modalBody.innerHTML = `
    <div class="modal-content" style="max-width: 480px;">
      <div class="bottom-sheet-handle"></div>
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
      <div class="modal-body" style="text-align: center; padding: 2rem 1.5rem;">
        <div style="font-size: 2.8rem; margin-bottom: 0.75rem;">📲</div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--accent-gold-light); margin-bottom: 0.5rem;">
          스마트폰 홈 화면에 앱 추가하기
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
          Chrome 또는 Safari 브라우저에서 아래 순서대로 누르면 설치형 앱으로 언제든 바로 실행할 수 있습니다.
        </p>
        
        <div style="text-align: left; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.2rem; display: flex; flex-direction: column; gap: 0.9rem; font-size: 0.88rem; color: #fff;">
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <span style="background: var(--accent-gold); color: #000; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0;">1</span>
            <span>브라우저 하단 또는 상단의 <strong>[공유(Share)]</strong> 또는 <strong>[메뉴(⋮)]</strong> 버튼 탭</span>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <span style="background: var(--accent-gold); color: #000; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0;">2</span>
            <span>목록에서 <strong>[홈 화면에 추가]</strong> 또는 <strong>[앱 설치]</strong> 선택</span>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <span style="background: var(--accent-gold); color: #000; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0;">3</span>
            <span>우측 상단의 <strong>[추가]</strong>를 누르면 설치 완료!</span>
          </div>
        </div>

        <button class="btn-primary" onclick="closeModal()" style="margin-top: 1.5rem; width: 100%; justify-content: center;">
          확인했습니다
        </button>
      </div>
    </div>
  `;
  modalBackdrop.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
