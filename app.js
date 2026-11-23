/**
 * OPUS (오푸스) - Classical Music Curation Engine
 * Core Application Logic, Filtering, AI Sommelier & Modal Controller
 */

// Application State
const state = {
  currentMood: 'all',
  selectedComposer: null,
  searchQuery: '',
  activeTab: 'home'
};

// DOM Elements
const piecesGrid = document.getElementById('piecesGrid');
const moodPillsContainer = document.getElementById('moodPills');
const composersGrid = document.getElementById('composersGrid');
const playlistsGrid = document.getElementById('playlistsGrid');
const searchInput = document.getElementById('searchInput');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalContentContainer');
const aiInput = document.getElementById('aiPromptInput');
const aiResultBox = document.getElementById('aiResultBox');
const heroTodayBtn = document.getElementById('heroTodayDocentBtn');
const heroPlayBtn = document.getElementById('heroTodayPlayBtn');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderMoodPills();
  renderPieces();
  renderComposers();
  renderPlaylists();
  setupEventListeners();
});

// Render Mood Filter Pills
function renderMoodPills() {
  if (!moodPillsContainer) return;
  moodPillsContainer.innerHTML = CLASSIC_DATA.moods.map(mood => `
    <button class="mood-pill ${state.currentMood === mood.id ? 'active' : ''}" data-mood="${mood.id}">
      <span>${mood.icon}</span>
      <span>${mood.name}</span>
    </button>
  `).join('');
}

// Render Pieces Grid
function renderPieces() {
  if (!piecesGrid) return;
  
  let filtered = CLASSIC_DATA.pieces;

  // Mood filter
  if (state.currentMood !== 'all') {
    filtered = filtered.filter(p => p.moods.includes(state.currentMood));
  }

  // Composer filter
  if (state.selectedComposer) {
    filtered = filtered.filter(p => p.composerId === state.selectedComposer);
  }

  // Search filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.titleEn.toLowerCase().includes(q) ||
      p.composerName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.backgroundStory.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    piecesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-dim);">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">🎻</p>
        <p style="font-size: 1.1rem; color: var(--text-muted);">조건에 맞는 클래식 명곡을 찾지 못했습니다.</p>
        <p style="font-size: 0.85rem; margin-top: 0.25rem;">다른 분위기 태그나 검색어를 입력해보세요.</p>
      </div>
    `;
    return;
  }

  piecesGrid.innerHTML = filtered.map(piece => `
    <div class="piece-card" data-piece-id="${piece.id}">
      <div class="card-cover">
        <img src="${piece.albumArt}" alt="${piece.title}" loading="lazy" />
        <div class="card-cover-badge">${piece.opus || piece.year}</div>
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
          <span class="movement-count">🎼 ${piece.movements.length}개 악장 구성</span>
          <button class="btn-docent-sm" onclick="openPieceModal('${piece.id}')">
            📖 스토리 & 악장
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Composers Grid
function renderComposers() {
  if (!composersGrid) return;
  composersGrid.innerHTML = CLASSIC_DATA.composers.map(c => `
    <div class="composer-card" onclick="openComposerModal('${c.id}')">
      <img class="composer-avatar" src="${c.avatar}" alt="${c.name}">
      <div class="composer-info">
        <h4>${c.name}</h4>
        <p class="era">${c.era.split('(')[0]}</p>
        <p class="years">${c.years} · ${c.country}</p>
      </div>
    </div>
  `).join('');
}

// Render Playlists
function renderPlaylists() {
  if (!playlistsGrid) return;
  playlistsGrid.innerHTML = CLASSIC_DATA.curatedPlaylists.map(pl => `
    <div class="piece-card" style="cursor: pointer;" onclick="filterByPlaylist('${pl.id}')">
      <div class="card-cover" style="height: 160px;">
        <img src="${pl.cover}" alt="${pl.title}" loading="lazy" />
        <div class="card-cover-badge">컬렉션 (${pl.pieceIds.length}곡)</div>
      </div>
      <div class="card-body">
        <h3 class="card-title" style="font-size: 1.05rem;">${pl.title}</h3>
        <p class="card-desc" style="margin-bottom: 0.5rem;">${pl.subtitle}</p>
        <div class="card-footer">
          <span class="movement-count" style="color: var(--accent-gold);">선별된 큐레이션</span>
          <button class="btn-docent-sm">수록곡 보기 ➔</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Setup Global Event Listeners
function setupEventListeners() {
  // Mood pills click
  if (moodPillsContainer) {
    moodPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.mood-pill');
      if (!btn) return;
      state.currentMood = btn.dataset.mood;
      state.selectedComposer = null; // reset composer filter
      renderMoodPills();
      renderPieces();
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderPieces();
    });
  }

  // Hero Actions (Today's Pick is Piece-1 'Moonlight')
  if (heroTodayBtn) {
    heroTodayBtn.addEventListener('click', () => openPieceModal('piece-1'));
  }
  if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => playPieceExternal("Beethoven Moonlight Sonata Barenboim", 'ytm'));
  }

  // Close Modal on backdrop click
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Open Piece Modal (Detailed Docent, Movements, Streaming Deep-links)
function openPieceModal(pieceId) {
  const piece = CLASSIC_DATA.pieces.find(p => p.id === pieceId);
  if (!piece) return;

  const ytmUrl = `https://music.youtube.com/search?q=${encodeURIComponent(piece.searchQuery)}`;
  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(piece.searchQuery)}`;
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(piece.searchQuery)}`;

  modalBody.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
      
      <div class="modal-header-hero">
        <img src="${piece.albumArt}" alt="${piece.title}">
        <div class="modal-header-gradient"></div>
        <div class="modal-header-text">
          <span style="color: var(--accent-gold-light); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em;">
            ${piece.composerName} · ${piece.opus || piece.year}
          </span>
          <h2 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #fff; line-height: 1.25; margin-top: 0.3rem;">
            ${piece.title}
          </h2>
          <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">${piece.titleEn}</p>
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
        <div class="docent-box" style="border-left-color: #60a5fa; background: rgba(96, 165, 250, 0.05);">
          <div class="docent-title" style="color: #93c5fd;">
            <span>🎧</span> 도슨트 감상 포인트 & 해설
          </div>
          <p class="docent-text">${piece.interpretation}</p>
        </div>

        <!-- Movements & Tracklist -->
        <div class="movements-section">
          <h4 style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.4rem;">
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

// Open Composer Modal
function openComposerModal(composerId) {
  const c = CLASSIC_DATA.composers.find(item => item.id === composerId);
  if (!c) return;

  const works = CLASSIC_DATA.pieces.filter(p => p.composerId === composerId);

  modalBody.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
      
      <div style="padding: 2rem; border-bottom: 1px solid var(--border-color); display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
        <img src="${c.avatar}" alt="${c.name}" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-gold);">
        <div>
          <span style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 600;">${c.era}</span>
          <h2 style="font-family: 'Cinzel', serif; font-size: 1.6rem; color: #fff; margin-top: 0.2rem;">${c.name}</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${c.nameEn} (${c.years} · ${c.country})</p>
        </div>
      </div>

      <div class="modal-body">
        <blockquote style="font-style: italic; color: var(--accent-gold-light); border-left: 3px solid var(--accent-gold); padding: 0.75rem 1rem; margin-bottom: 1.5rem; background: rgba(212,175,55,0.06);">
          "${c.quote}"
        </blockquote>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #fff; margin-bottom: 0.5rem;">생애 및 예술 세계</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.7;">${c.bio}</p>
        </div>

        <div class="docent-box" style="margin-bottom: 1.75rem;">
          <div class="docent-title"><span>💡</span> 흥미로운 비하인드 스토리</div>
          <p class="docent-text">${c.funFact}</p>
        </div>

        <div>
          <h4 style="color: #fff; margin-bottom: 0.75rem;">수록된 대표곡 (${works.length})</h4>
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${works.map(w => `
              <div class="movement-item" onclick="openPieceModal('${w.id}')" style="cursor: pointer;">
                <div>
                  <div class="movement-title">${w.title}</div>
                  <div class="movement-meta">${w.opus || w.year}</div>
                </div>
                <button class="btn-docent-sm">해설 보기 ➔</button>
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

// Deep Linking Playback Helper
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

// Filter by Curated Playlist
function filterByPlaylist(playlistId) {
  const pl = CLASSIC_DATA.curatedPlaylists.find(p => p.id === playlistId);
  if (!pl) return;

  state.currentMood = 'all';
  state.selectedComposer = null;
  state.searchQuery = '';
  
  const filtered = CLASSIC_DATA.pieces.filter(p => pl.pieceIds.includes(p.id));
  
  if (piecesGrid) {
    piecesGrid.scrollIntoView({ behavior: 'smooth' });
    piecesGrid.innerHTML = `
      <div style="grid-column: 1 / -1; margin-bottom: 1rem; padding: 1rem; background: rgba(212,175,55,0.1); border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 0.8rem; color: var(--accent-gold);">선택된 테마 플레이리스트</span>
          <h3 style="color: #fff; font-size: 1.2rem;">${pl.title}</h3>
        </div>
        <button class="btn-docent-sm" onclick="renderPieces()">전체 목록 복원</button>
      </div>
    ` + filtered.map(piece => `
      <div class="piece-card" data-piece-id="${piece.id}">
        <div class="card-cover">
          <img src="${piece.albumArt}" alt="${piece.title}" loading="lazy" />
          <div class="card-cover-badge">${piece.opus || piece.year}</div>
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

// AI Sommelier Smart Recommendation
function handleAIPrompt(customText = null) {
  const prompt = (customText || (aiInput ? aiInput.value : '')).trim();
  if (!prompt) return;

  if (aiInput) aiInput.value = prompt;
  if (!aiResultBox) return;

  aiResultBox.style.display = 'block';
  aiResultBox.innerHTML = `
    <div style="text-align: center; padding: 1.5rem; color: var(--accent-gold-light);">
      <p style="font-size: 1.2rem; animation: pulse 1s infinite;">✨ AI 클래식 소믈리에가 선율을 고르는 중입니다...</p>
    </div>
  `;

  setTimeout(() => {
    // Intelligent Match Engine based on prompt keywords
    let matchedPiece = null;
    let sommelierComment = "";

    const pLower = prompt.toLowerCase();

    if (pLower.includes("비") || pLower.includes("비오는") || pLower.includes("우울") || pLower.includes("눈물")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-4') || CLASSIC_DATA.pieces[0]; // Chopin Raindrop
      sommelierComment = "비 오는 날의 먹먹한 창밖 풍경에는 처마 끝에서 맑고 투명하게 떨어지는 빗방울을 닮은 쇼팽의 프렐류드가 제격입니다. 당신의 젖은 마음에 따뜻한 온기를 더해줄 거예요.";
    } else if (pLower.includes("새벽") || pLower.includes("밤") || pLower.includes("달") || pLower.includes("사색")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-8') || CLASSIC_DATA.pieces[0]; // Debussy Clair de lune
      sommelierComment = "모두가 잠든 고요한 시간, 달빛이 잔잔한 수면 위로 내려앉듯 영혼을 정화해 주는 드뷔시의 '달빛'을 권해드립니다. 복잡했던 생각들이 은빛 여운 속으로 스르륵 흩어질 것입니다.";
    } else if (pLower.includes("공부") || pLower.includes("집중") || pLower.includes("몰입") || pLower.includes("작업") || pLower.includes("코딩")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-7') || CLASSIC_DATA.pieces[5]; // Bach Cello Suite
      sommelierComment = "산만한 잡념을 걷어내고 깊은 몰입의 뇌파로 유도하는 바흐의 무반주 첼로 모음곡입니다. 단 하나의 악기가 빚어내는 완벽한 질서와 울림이 지적인 집중을 완성해 드립니다.";
    } else if (pLower.includes("열정") || pLower.includes("활력") || pLower.includes("웅장") || pLower.includes("힘") || pLower.includes("운동")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-2') || CLASSIC_DATA.pieces[1]; // Beethoven Fate
      sommelierComment = "무기력함을 부수고 심장을 다시 뛰게 할 불꽃 같은 에너지가 필요한 순간입니다. 가혹한 운명에 굴복하지 않고 끝내 승리를 쟁취하는 베토벤의 운명 교향곡을 들려드립니다.";
    } else if (pLower.includes("휴식") || pLower.includes("커피") || pLower.includes("카페") || pLower.includes("편안") || pLower.includes("수면")) {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-5') || CLASSIC_DATA.pieces[2]; // Mozart PC 21
      sommelierComment = "티 없이 맑은 햇살 아래 따뜻한 차 한 잔을 마시는 듯한 평화. 천상의 순수함을 담은 모차르트 피아노 협주곡 21번 2악장 안단테로 마음의 긴장을 부드럽게 이완해 보세요.";
    } else {
      matchedPiece = CLASSIC_DATA.pieces.find(p => p.id === 'piece-3') || CLASSIC_DATA.pieces[0]; // Chopin Nocturne
      sommelierComment = `"${prompt}"에 머무는 당신의 마음에 가장 어루만져 주는 선율로, 밤의 서정을 시처럼 노래한 쇼팽의 녹턴을 추천해 드립니다.`;
    }

    aiResultBox.innerHTML = `
      <div style="border-left: 3px solid var(--accent-gold); padding-left: 1rem; margin-bottom: 1rem;">
        <span style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 700; letter-spacing: 0.05em;">AI SOMMELIER'S NOTE</span>
        <p style="font-size: 0.95rem; color: #fff; margin-top: 0.3rem; line-height: 1.6;">
          "${sommelierComment}"
        </p>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center; background: rgba(255,255,255,0.04); padding: 0.9rem; border-radius: var(--radius-sm); justify-content: space-between; flex-wrap: wrap;">
        <div style="display: flex; gap: 0.85rem; align-items: center;">
          <img src="${matchedPiece.albumArt}" alt="${matchedPiece.title}" style="width: 54px; height: 54px; border-radius: 8px; object-fit: cover;">
          <div>
            <div style="font-size: 0.78rem; color: var(--accent-gold);">${matchedPiece.composerName}</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: #fff;">${matchedPiece.title}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${matchedPiece.opus || matchedPiece.year}</div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-docent-sm" onclick="openPieceModal('${matchedPiece.id}')">📖 스토리 보기</button>
          <a href="https://music.youtube.com/search?q=${encodeURIComponent(matchedPiece.searchQuery)}" target="_blank" rel="noopener noreferrer" class="btn-stream btn-ytm" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
            ▶ 바로 듣기
          </a>
        </div>
      </div>
    `;
  }, 500);
}
