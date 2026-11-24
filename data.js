/**
 * OPUS (오푸스) - Classical Music Dataset (Enhanced Edition)
 * 작곡가 정보, 작곡가별 대표 명곡 랭킹, 곡 배경과 해석, 악장별 구성, 분위기 태그
 */

const CLASSIC_DATA = {
  composers: [
    {
      id: "beethoven",
      name: "루트비히 판 베토벤",
      nameEn: "Ludwig van Beethoven",
      era: "고전-낭만주의 전환기 (Classic to Romantic)",
      years: "1770 - 1827",
      country: "독일 / 오스트리아",
      avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      quote: "고뇌를 넘어 환희로. 나는 고난 속에서도 음악을 통해 운명의 목을 쥐겠다.",
      bio: "인류 역사상 가장 위대한 음악가. 20대 후반부터 시작된 청력 상실이라는 가혹한 비극 속에서도 '불굴의 의지'로 교향곡, 소나타, 협주곡의 새 시대를 열었습니다.",
      funFact: "베토벤은 매일 아침 커피를 마실 때 정확히 원두 60알을 직접 세어 내릴 정도로 지독한 완벽주의자였습니다."
    },
    {
      id: "chopin",
      name: "프레데리크 쇼팽",
      nameEn: "Frédéric Chopin",
      era: "초기 낭만주의 (Early Romantic)",
      years: "1810 - 1849",
      country: "폴란드 / 프랑스",
      avatar: "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=600&q=80",
      quote: "단어의 끝에서 음악이 시작된다. 단순함은 예술의 궁극적인 성취다.",
      bio: "'피아노의 시인'으로 불리며, 평생 거의 모든 작품을 피아노로만 작곡했습니다. 조국 폴란드를 향한 애절한 향수와 섬세한 루바토 선율로 낭만주의 피아노의 절정을 이룩했습니다.",
      funFact: "체구가 매우 가냘팠던 쇼팽은 대규모 콘서트홀보다 살롱(Salon)에서 지인들과 함께 나누는 친밀한 연주를 사랑했습니다."
    },
    {
      id: "mozart",
      name: "볼프강 아마데우스 모차르트",
      nameEn: "Wolfgang Amadeus Mozart",
      era: "고전주의 (Classical)",
      years: "1756 - 1791",
      country: "오스트리아",
      avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      quote: "음악은 결코 귀를 괴롭혀서는 안 되며, 언제나 듣는 이를 즐겁게 해야 한다.",
      bio: "35년의 짧은 생애 동안 600곡이 넘는 천상의 명곡을 남긴 불세출의 천재. 티 없이 맑은 순수함과 완벽한 형식미를 동시에 구현했습니다.",
      funFact: "유쾌하고 장난기가 넘쳤던 모차르트는 가족과 친구들에게 보낸 편지에 기상천외한 농담과 말장난을 가득 남겼습니다."
    },
    {
      id: "bach",
      name: "요한 제바스티안 바흐",
      nameEn: "Johann Sebastian Bach",
      era: "바로크 (Baroque)",
      years: "1685 - 1750",
      country: "독일",
      avatar: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
      quote: "음악의 궁극적인 목적은 오직 신의 영광과 인간 영혼의 위로뿐이다.",
      bio: "'서양 음악의 아버지'라 불리며 바로크 대위법과 화성학을 완성했습니다. 수학처럼 정교한 건축적 질서 속에 깊고 성스러운 영성을 담았습니다.",
      funFact: "바흐는 일생 동안 1,000곡이 넘는 걸작을 남겼으며, 20명의 자녀 중 여러 명을 당대 최고의 음악가로 길러냈습니다."
    },
    {
      id: "debussy",
      name: "클로드 드뷔시",
      nameEn: "Claude Debussy",
      era: "인상주의 (Impressionism)",
      years: "1862 - 1918",
      country: "프랑스",
      avatar: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
      quote: "규칙이란 인간이 만든 것에 불과하다. 내 규칙은 오직 나의 기쁨뿐이다.",
      bio: "전통적 화성의 틀을 깨고 몽환적인 음색과 빛의 질감을 음악으로 묘사한 프랑스 인상주의 음악의 창시자입니다.",
      funFact: "바다를 사랑했던 드뷔시는 악보 표지에 일본 우키요에 파도 그림을 넣도록 직접 주문하기도 했습니다."
    },
    {
      id: "tchaikovsky",
      name: "표트르 차이콥스키",
      nameEn: "Pyotr Ilyich Tchaikovsky",
      era: "후기 낭만주의 (Late Romantic)",
      years: "1840 - 1893",
      country: "러시아",
      avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
      quote: "영감은 게으른 자를 찾아오지 않는다. 나는 매일 정해진 시간에 피아노 앞에 앉는다.",
      bio: "러시아 특유의 짙은 우수와 애수, 가슴을 저미는 낭만적 선율의 거장. '백조의 호수', '호두까기 인형' 등 불후의 발레 음악과 교향곡을 남겼습니다.",
      funFact: "차이콥스키는 폰 메크 부인으로부터 13년간 거액의 후원을 받았지만 '단 한 번도 직접 만나지 않는다'는 약속을 지켰습니다."
    }
  ],

  moods: [
    { id: "all", name: "전체보기", icon: "✨", desc: "모든 클래식 명곡 모음" },
    { id: "dawn", name: "새벽 감성 & 사색", icon: "🌙", desc: "깊은 밤, 고요한 생각에 잠기고 싶을 때" },
    { id: "focus", name: "깊은 몰입 & 스터디", icon: "📚", desc: "집중력과 작업 효율을 극대화하는 선율" },
    { id: "rainy", name: "비 오는 날의 서정", icon: "🌧️", desc: "창밖 빗소리와 어우러지는 아련한 첼로와 피아노" },
    { id: "relax", name: "휴식 & 수면", icon: "☕", desc: "지친 하루를 보듬고 편안한 안식으로 이끄는 선율" },
    { id: "heroic", name: "열정 & 벅찬 활력", icon: "🔥", desc: "가슴을 뛰게 하고 무기력함을 깨우는 웅장함" }
  ],

  pieces: [
    // ----------------------------------------------------
    // 베토벤 대표 명곡
    // ----------------------------------------------------
    {
      id: "beethoven-moonlight",
      title: "피아노 소나타 14번 '월광' (Op.27 No.2)",
      titleEn: "Piano Sonata No. 14 'Moonlight'",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 27 No. 2",
      year: "1801",
      signatureRank: 1,
      moods: ["dawn", "rainy", "focus"],
      albumArt: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      description: "베토벤 피아노 음악의 최고봉. 1악장의 가슴 시린 멜랑콜리와 3악장의 폭풍 같은 정열.",
      backgroundStory: "귓병이 악화되어 절망에 빠졌던 시기, 14세 연하의 귀족 제자 줄리에타 귀차르디와의 가슴 아픈 실연 속에서 작곡되었습니다. 시인 렐슈타프가 '스위스 루체른 호수의 달빛 아래 흔들리는 조각배 같다'고 묘사한 데서 '월광'이라는 이름이 붙었습니다.",
      interpretation: "1악장의 느린 삼연음표는 호수의 잔물결과 슬픈 탄식을, 3악장은 억눌린 운명에 맞서는 베토벤의 격렬한 분노를 담고 있습니다.",
      movements: [
        { no: "1악장", title: "Adagio sostenuto", tempo: "느리고 차분하게", desc: "달빛이 비치는 잔잔한 호수와 슬픈 탄식" },
        { no: "2악장", title: "Allegretto", tempo: "경쾌하게", desc: "리스트가 '두 심연 사이에 핀 한 송이 꽃'이라 부른 미뉴에트" },
        { no: "3악장", title: "Presto agitato", tempo: "격정적이고 매우 빠르게", desc: "운명을 향해 쏟아내는 폭풍 같은 격정" }
      ],
      searchQuery: "Beethoven Moonlight Sonata Barenboim"
    },
    {
      id: "beethoven-fate",
      title: "교향곡 제5번 C단조 '운명' (Op.67)",
      titleEn: "Symphony No. 5 'Fate'",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 67",
      year: "1808",
      signatureRank: 2,
      moods: ["heroic"],
      albumArt: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      description: "‘빠바바밤-’ 온 인류가 아는 모티프. 가혹한 운명에 맞서 싸워 마침내 승리의 환희를 쟁취하는 드라마.",
      backgroundStory: "'운명은 이처럼 문을 두드린다'는 말로 유명한 도입부. 나폴레옹 전쟁의 혼란과 청각 상실이라는 비극 속에서 불굴의 의지로 완성한 걸작입니다.",
      interpretation: "어두운 C단조에서 시작해 4악장의 눈부신 C장조로 터져 나오는 '암흑에서 광명으로'의 영웅적 서사를 정립한 인류 음악의 유산입니다.",
      movements: [
        { no: "1악장", title: "Allegro con brio", tempo: "빠르고 생기있게", desc: "운명의 동기 4음이 집요하게 발전하는 긴장감" },
        { no: "2악장", title: "Andante con moto", tempo: "느리지만 활기차게", desc: "마음을 어루만지는 따뜻한 비올라와 첼로의 변주곡" },
        { no: "3악장", title: "Scherzo. Allegro", tempo: "빠르고 날카롭게", desc: "저음현의 불길한 테마와 신비로운 연결부" },
        { no: "4악장", title: "Allegro", tempo: "당당하고 장엄하게", desc: "트롬본과 피콜로가 합류하며 터지는 압도적 승리의 환희" }
      ],
      searchQuery: "Beethoven Symphony No 5 Carlos Kleiber"
    },
    {
      id: "beethoven-elise",
      title: "엘리제를 위하여 (Für Elise, WoO 59)",
      titleEn: "Für Elise in A minor",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "WoO 59",
      year: "1810",
      signatureRank: 3,
      moods: ["focus", "relax"],
      albumArt: "https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=800&q=80",
      description: "세상에서 가장 친숙한 피아노 선율. 사랑스러우면서도 아련한 추억을 자아내는 로맨틱 소품.",
      backgroundStory: "베토벤 사후에 발견된 자필 악보에 '4월 27일 테레제의 추억을 위하여'라고 적혀 있었으나, 글씨가 흐려 출판업자가 '엘리제'로 잘못 읽어 지금의 이름이 되었습니다. 실제 주인공은 베토벤이 청혼했던 테레제 말파티로 알려져 있습니다.",
      interpretation: "단순하면서도 한 번 들으면 잊히지 않는 첫 멜로디와 중간부의 격정적인 전개가 절묘한 대비를 이룹니다.",
      movements: [
        { no: "단일 소품", title: "Poco moto", tempo: "약간 빠르게", desc: "아름다운 주제 선율과 회상에 잠기는 중간부" }
      ],
      searchQuery: "Beethoven Fur Elise Lang Lang"
    },
    {
      id: "beethoven-pathetique",
      title: "피아노 소나타 8번 C단조 '비창' 2악장",
      titleEn: "Piano Sonata No. 8 'Pathétique', II. Adagio cantabile",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 13",
      year: "1798",
      signatureRank: 4,
      moods: ["relax", "dawn", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      description: "베토벤이 남긴 가장 따뜻하고 서정적인 아다지오. 팝송과 영화 OST로 수없이 오마주된 명선율.",
      backgroundStory: "베토벤 자신이 직접 '대소나타 비창(Grande Sonate Pathétique)'이라는 부제를 붙인 유일한 소나타입니다. 젊은 날의 고뇌와 슬픔을 노래하듯 아름답게 승화시켰습니다.",
      interpretation: "오른손이 노래하는 감미로운 멜로디는 깊은 슬픔을 위로하는 어머니의 손길 같은 평온함을 선사합니다.",
      movements: [
        { no: "2악장", title: "Adagio cantabile", tempo: "노래하듯 느리게", desc: "영혼을 치유하는 천상의 칸타빌레 선율" }
      ],
      searchQuery: "Beethoven Pathetique Sonata 2nd Movement Rubinstein"
    },
    {
      id: "beethoven-ode-to-joy",
      title: "교향곡 제9번 '합창' 4악장 '환희의 송가'",
      titleEn: "Symphony No. 9 'Choral', IV. Ode to Joy",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 125",
      year: "1824",
      signatureRank: 5,
      moods: ["heroic"],
      albumArt: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      description: "교향곡 최초로 인간의 목소리를 도입한 인류 음악의 최고봉. 모든 인류의 형제애와 평화를 노래합니다.",
      backgroundStory: "완전히 귀가 먹은 베토벤이 1824년 초연 무대에서 지휘를 마친 뒤, 관객의 우레와 같은 기립 박수를 듣지 못해 알토 독창자가 그의 몸을 돌려 관객을 보게 했다는 감동적인 일화가 전해집니다.",
      interpretation: "실러의 시 '환희에 부침'에 곡을 붙인 인류 역사의 문화유산. 팀파니와 오케스트라, 대합창이 어우러져 폭발하는 카타르시스를 줍니다.",
      movements: [
        { no: "4악장", title: "Presto - Allegro assai", tempo: "장엄하고 빠르게", desc: "베이스 독창의 선언과 인류 대합창의 환희" }
      ],
      searchQuery: "Beethoven Symphony 9 Ode to Joy Karajan"
    },

    // ----------------------------------------------------
    // 쇼팽 대표 명곡
    // ----------------------------------------------------
    {
      id: "chopin-nocturne-9-2",
      title: "야상곡(녹턴) 제2번 Eb장조 (Op.9 No.2)",
      titleEn: "Nocturne in E-flat major, Op. 9 No. 2",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 9 No. 2",
      year: "1832",
      signatureRank: 1,
      moods: ["dawn", "relax", "focus"],
      albumArt: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      description: "세상에서 가장 유명한 피아노 야상곡. 달콤하고 부드럽게 밤의 정취를 노래하는 시적 선율.",
      backgroundStory: "20대 초반 파리에 도착한 직후 작곡된 곡으로, 파리 살롱에서 쇼팽의 시적 연주에 매료된 귀족 부인 마리 플레옐에게 헌정되었습니다.",
      interpretation: "왼손의 안정적인 왈츠 반주 위에 오른손이 벨칸토 오페라처럼 감미롭게 노래합니다. 반복될 때마다 장식음이 보석처럼 화려하게 변주됩니다.",
      movements: [
        { no: "단일 악장", title: "Andante", tempo: "느리게 걷듯이", desc: "밤의 서정과 화려한 카덴차로 마무리되는 명곡" }
      ],
      searchQuery: "Chopin Nocturne Op 9 No 2 Rubinstein"
    },
    {
      id: "chopin-raindrop",
      title: "빗방울 전주곡 (Op.28 No.15)",
      titleEn: "Prelude in D-flat major 'Raindrop'",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 28 No. 15",
      year: "1839",
      signatureRank: 2,
      moods: ["rainy", "dawn", "focus"],
      albumArt: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
      description: "지속해서 똑똑 떨어지는 빗방울 소리. 요양지의 고독과 폭풍우의 공포를 담아낸 걸작.",
      backgroundStory: "쇼팽이 연인 조르주 상드와 함께 스페인 마요르카 섬으로 요양을 떠났을 때, 끝없는 겨울비 속에서 홀로 지붕에서 떨어지는 빗방울 소리를 들으며 썼습니다.",
      interpretation: "곡 전체를 관통하는 Ab(G#) 음의 지속적인 연타가 빗방울을 상징합니다. 중간부 C#단조에서는 어두운 천둥번개 같은 공포가 몰아칩니다.",
      movements: [
        { no: "단일 악장", title: "Sostenuto", tempo: "음 하나하나를 충실히", desc: "처마 끝 빗방울과 중간부의 격렬한 긴장감" }
      ],
      searchQuery: "Chopin Raindrop Prelude Seong-Jin Cho"
    },
    {
      id: "chopin-fantaisie-impromptu",
      title: "즉흥환상곡 C#단조 (Op.66)",
      titleEn: "Fantaisie-Impromptu in C-sharp minor",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 66",
      year: "1834",
      signatureRank: 3,
      moods: ["heroic", "focus"],
      albumArt: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      description: "건반 위를 질주하는 마법 같은 16분음표와 감미로운 중간부 칸타빌레의 눈부신 조화.",
      backgroundStory: "쇼팽 생전에는 출판되지 않고 서랍 속에 봉인되어 있었으나, 쇼팽 사후 유언 집행자 폰타나가 출판하여 오늘날 쇼팽의 가장 사랑받는 피아노곡이 되었습니다.",
      interpretation: "오른손의 16분음표 4개와 왼손의 셋잇단음표 3개가 빚어내는 복합 리듬(Polyrhythm)의 신비로움이 압권입니다.",
      movements: [
        { no: "단일 악장", title: "Allegro agitato", tempo: "격렬하고 빠르게", desc: "빛의 속도로 질주하는 아르페지오와 감미로운 중간부" }
      ],
      searchQuery: "Chopin Fantaisie Impromptu Yundi Li"
    },
    {
      id: "chopin-tristesse",
      title: "에튀드 Op.10 No.3 '이별의 곡'",
      titleEn: "Étude Op. 10 No. 3 'Tristesse'",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 10 No. 3",
      year: "1832",
      signatureRank: 4,
      moods: ["rainy", "relax", "dawn"],
      albumArt: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      description: "쇼팽 스스로 '내 평생 이렇게 아름다운 멜로디는 다시 쓰지 못했다'고 고백한 눈물의 선율.",
      backgroundStory: "고국 폴란드의 혁명이 실패로 끝나 다시는 조국으로 돌아갈 수 없게 된 젊은 쇼팽이 흘린 망향의 눈물이 고스란히 담겨 있습니다.",
      interpretation: "절제된 슬픔으로 시작해 중간부의 불꽃 같은 절규를 거쳐 다시 고요한 체념으로 돌아오는 완벽한 서정시입니다.",
      movements: [
        { no: "단일 곡", title: "Lento ma non troppo", tempo: "느리지만 너무 처지지 않게", desc: "가장 아름다운 망향의 송가" }
      ],
      searchQuery: "Chopin Etude Op 10 No 3 Pollini"
    },

    // ----------------------------------------------------
    // 모차르트 대표 명곡
    // ----------------------------------------------------
    {
      id: "mozart-eine-kleine",
      title: "아이네 클라이네 나흐트무지크 1악장 (K.525)",
      titleEn: "Eine kleine Nachtmusik, I. Allegro",
      composerId: "mozart",
      composerName: "볼프강 아마데우스 모차르트",
      opus: "K. 525",
      year: "1787",
      signatureRank: 1,
      moods: ["heroic", "focus"],
      albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      description: "‘소야곡(작은 밤의 세레나데)’. 모차르트 특유의 밝고 경쾌한 천재성이 폭발하는 현악 앙상블.",
      backgroundStory: "모차르트가 오페라 '돈 조반니'를 작곡하던 전성기 빈의 여름밤, 귀족 정원 파티의 야외 연주를 위해 쓴 세레나데 명곡입니다.",
      interpretation: "도입부 현악기들의 힘찬 유니즌과 뒤이어지는 우아한 선율은 고전주의 균형미의 교과서입니다.",
      movements: [
        { no: "1악장", title: "Allegro", tempo: "빠르고 경쾌하게", desc: "누구나 아는 활기찬 현악 앙상블의 오프닝" }
      ],
      searchQuery: "Mozart Eine kleine Nachtmusik Karajan"
    },
    {
      id: "mozart-pc-21-andante",
      title: "피아노 협주곡 21번 C장조 2악장 안단테",
      titleEn: "Piano Concerto No. 21, II. Andante",
      composerId: "mozart",
      composerName: "볼프강 아마데우스 모차르트",
      opus: "K. 467",
      year: "1785",
      signatureRank: 2,
      moods: ["relax", "dawn", "focus"],
      albumArt: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      description: "영화 '엘비라 마디간'의 테마곡. 천상의 평화와 티 없는 순수함을 담은 안식의 선율.",
      backgroundStory: "모차르트가 빈에서 피아니스트로서 최고 전성기를 누리던 시절, 직접 예약 음악회에서 연주하기 위해 작곡했습니다.",
      interpretation: "약음기를 낀 현악기의 잔잔한 물결 위로 독주 피아노가 한 점 티 없는 맑은 목소리로 천상의 노래를 건넵니다.",
      movements: [
        { no: "2악장", title: "Andante", tempo: "느리게 걷듯이", desc: "영혼을 평온하게 어루만지는 천상의 안단테" }
      ],
      searchQuery: "Mozart Piano Concerto 21 Andante Pollini"
    },
    {
      id: "mozart-turkish-march",
      title: "터키 행진곡 (피아노 소나타 11번 3악장, K.331)",
      titleEn: "Turkish March (Piano Sonata No. 11, III. Rondo alla Turca)",
      composerId: "mozart",
      composerName: "볼프강 아마데우스 모차르트",
      opus: "K. 331",
      year: "1783",
      signatureRank: 3,
      moods: ["heroic", "focus"],
      albumArt: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      description: "오스만 튀르크 군악대의 타악기 리듬을 모차르트만의 경쾌하고 재치 있는 피아노로 묘사한 걸작.",
      backgroundStory: "18세기 오스트리아 빈에 불어닥친 '터키풍(Turquerie)' 유행에 영감을 받아 작곡된 이국적이고 재기발랄한 론도입니다.",
      interpretation: "발랄한 리듬과 스타카토 타건이 마치 발을 구르며 행진하는 군악대의 흥겨운 모습을 연상시킵니다.",
      movements: [
        { no: "3악장", title: "Allegretto", tempo: "조금 빠르게", desc: "경쾌한 터키풍 군악 리듬의 론도 피날레" }
      ],
      searchQuery: "Mozart Turkish March Fazil Say"
    },
    {
      id: "mozart-lacrimosa",
      title: "레퀴엠 중 '라크리모사(눈물의 날)' (K.626)",
      titleEn: "Requiem in D minor, Lacrimosa",
      composerId: "mozart",
      composerName: "볼프강 아마데우스 모차르트",
      opus: "K. 626",
      year: "1791",
      signatureRank: 4,
      moods: ["rainy", "dawn"],
      albumArt: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
      description: "모차르트가 병상에서 마지막 8마디를 남기고 숨을 거둔, 인류 역사상 가장 슬프고 성스러운 진혼곡.",
      backgroundStory: "정체불명의 검은 옷을 입은 사나이로부터 죽은 아내를 위한 진혼곡을 의뢰받았으나, 모차르트는 이것이 '자신의 죽음을 위한 노래'라 직감하며 쓰러졌습니다.",
      interpretation: "흐느끼는 듯한 현악기의 탄식과 합창단의 애절한 기도가 심금을 울리는 숭고한 비극의 정점입니다.",
      movements: [
        { no: "라크리모사", title: "Larghetto", tempo: "느리고 장엄하게", desc: "눈물의 날, 모차르트 최후의 백조의 노래" }
      ],
      searchQuery: "Mozart Requiem Lacrimosa Karl Bohm"
    },

    // ----------------------------------------------------
    // 바흐 대표 명곡
    // ----------------------------------------------------
    {
      id: "bach-air-on-g",
      title: "G선상의 아리아 (관현악 모음곡 3번)",
      titleEn: "Air on the G String (BWV 1068)",
      composerId: "bach",
      composerName: "요한 제바스티안 바흐",
      opus: "BWV 1068",
      year: "1730",
      signatureRank: 1,
      moods: ["relax", "focus", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      description: "바이올린의 가장 굵고 따뜻한 줄 하나(G선)만으로 연주되는, 영혼을 어루만지는 성스러운 기도.",
      backgroundStory: "원래 관현악 모음곡 3번의 '에어(Air)'였으나, 빌헬미가 바이올린의 가장 낮은 줄인 G선 하나로 연주할 수 있도록 편곡하며 세계적 명곡이 되었습니다.",
      interpretation: "흔들림 없는 베이스라인의 하강 선율 위에 바이올린의 유려한 노래가 얹히며 깊은 영적 평온을 선물합니다.",
      movements: [
        { no: "단일 곡", title: "Air", tempo: "느리고 서정적으로", desc: "하강하는 베이스라인 위에 펼쳐지는 천상의 노래" }
      ],
      searchQuery: "Bach Air on the G String HAUSER"
    },
    {
      id: "bach-cello-suite-1",
      title: "무반주 첼로 모음곡 1번 '프렐류드' (BWV 1007)",
      titleEn: "Cello Suite No. 1 'Prelude'",
      composerId: "bach",
      composerName: "요한 제바스티안 바흐",
      opus: "BWV 1007",
      year: "1720",
      signatureRank: 2,
      moods: ["focus", "dawn", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
      description: "단 하나의 첼로가 빚어내는 가장 순수하고 깊은 울림. 마음의 소음을 지우는 첼로의 성서.",
      backgroundStory: "200년간 연습용 악보로 잊혀 있다가 파블로 카잘스가 바르셀로나 고서점에서 발굴해 세상에 빛을 보게 한 기적의 작품입니다.",
      interpretation: "반주 없이 하나의 악기로 화성과 선율을 완벽히 구축하며, 호흡과 심박을 가장 차분하게 가라앉혀 줍니다.",
      movements: [
        { no: "1곡", title: "Prélude", tempo: "유려하게 흐르듯", desc: "자연의 파도처럼 물결치는 불멸의 첼로 오프닝" }
      ],
      searchQuery: "Bach Cello Suite No 1 Prelude Yo-Yo Ma"
    },
    {
      id: "bach-toccata-and-fugue",
      title: "토카타와 푸가 D단조 (BWV 565)",
      titleEn: "Toccata and Fugue in D minor",
      composerId: "bach",
      composerName: "요한 제바스티안 바흐",
      opus: "BWV 565",
      year: "1704",
      signatureRank: 3,
      moods: ["heroic"],
      albumArt: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80",
      description: "‘따다다단-’ 파이프 오르간이 뿜어내는 압도적인 웅장함과 드라마틱한 바로크 대위법의 정점.",
      backgroundStory: "청년 바흐가 아른슈타트 교회 오르가니스트 시절 파이프 오르간의 모든 음색과 페달 기교를 시험하기 위해 쓴 혁명적 작품입니다.",
      interpretation: "천둥처럼 포효하는 도입부 토카타와 뒤이어 한 치의 오차도 없이 맞물리는 정교한 4성부 푸가가 경이로움을 줍니다.",
      movements: [
        { no: "전반부", title: "Toccata", tempo: "격정적으로", desc: "거대한 파이프 오르간의 번개 같은 오프닝" },
        { no: "후반부", title: "Fugue", tempo: "정교하게", desc: "수학적 대위법이 엮어내는 장대한 클라이맥스" }
      ],
      searchQuery: "Bach Toccata and Fugue in D minor BWV 565"
    },

    // ----------------------------------------------------
    // 드뷔시 대표 명곡
    // ----------------------------------------------------
    {
      id: "debussy-clair-de-lune",
      title: "베르가마스크 모음곡 3곡 '달빛'",
      titleEn: "Suite bergamasque, III. Clair de lune",
      composerId: "debussy",
      composerName: "클로드 드뷔시",
      opus: "L. 75",
      year: "1890",
      signatureRank: 1,
      moods: ["dawn", "relax", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=800&q=80",
      description: "밤하늘 은빛 달빛의 흔들림. 프랑스 인상주의 피아노 음악의 가장 신비롭고 서정적인 정수.",
      backgroundStory: "프랑스 시인 폴 베를렌의 시 '달빛'에서 영감을 받아 빛과 그림자, 밤의 서늘한 공기를 음악적 색채로 포착했습니다.",
      interpretation: "박자감을 잊게 만드는 유려한 9/8박자 아르페지오와 건반의 잔향이 마음을 씻어내립니다.",
      movements: [
        { no: "제3곡", title: "Clair de lune", tempo: "매우 고요하게 표현을 담아", desc: "달빛이 은빛 호수 위로 유영하는 서정적 몽상" }
      ],
      searchQuery: "Debussy Clair de lune Seong-Jin Cho"
    },
    {
      id: "debussy-arabesque-1",
      title: "아라베스크 제1번 E장조",
      titleEn: "Deux Arabesques, No. 1 in E major",
      composerId: "debussy",
      composerName: "클로드 드뷔시",
      opus: "L. 66",
      year: "1888",
      signatureRank: 2,
      moods: ["focus", "relax"],
      albumArt: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      description: "바람에 흔들리는 나뭇잎과 반짝이는 시냇물처럼 유려하게 흘러가는 피아노의 물결.",
      backgroundStory: "이슬람 건축의 아라베스크 덩굴무늬 장식에서 영감을 얻어, 선율의 곡선미가 끝없이 유기적으로 얽히도록 작곡했습니다.",
      interpretation: "셋잇단음표와 8분음표의 교차가 빚어내는 부드러운 물결이 마음에 싱그러운 여유를 선사합니다.",
      movements: [
        { no: "제1번", title: "Andantino con moto", tempo: "생기있게 걷듯이", desc: "유려한 아라베스크 곡선 선율의 향연" }
      ],
      searchQuery: "Debussy Arabesque No 1 Ciccolini"
    },

    // ----------------------------------------------------
    // 차이콥스키 대표 명곡
    // ----------------------------------------------------
    {
      id: "tchaikovsky-swan-lake",
      title: "백조의 호수 모음곡 중 '정경(Scene)'",
      titleEn: "Swan Lake Suite, Op. 20a: Scene",
      composerId: "tchaikovsky",
      composerName: "표트르 차이콥스키",
      opus: "Op. 20a",
      year: "1876",
      signatureRank: 1,
      moods: ["rainy", "heroic"],
      albumArt: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=800&q=80",
      description: "오보에의 애수 어린 독주로 시작하여 웅장한 오케스트라로 번지는 백조의 슬픈 전설.",
      backgroundStory: "마법사의 저주로 백조로 변한 오데트 공주의 사랑 이야기. 오케스트라의 장대한 사운드로 발레 음악을 순수 교향악의 경지로 끌어올렸습니다.",
      interpretation: "하프의 아르페지오가 호수를 그리면 오보에가 눈물 같은 백조의 테마를 노래합니다.",
      movements: [
        { no: "정경", title: "Moderato", tempo: "보통 빠르기로", desc: "오보에의 애절한 솔로와 백조의 날갯짓" }
      ],
      searchQuery: "Tchaikovsky Swan Lake Scene Valery Gergiev"
    },
    {
      id: "tchaikovsky-waltz-of-flowers",
      title: "호두까기 인형 중 '꽃의 왈츠'",
      titleEn: "The Nutcracker, Op. 71a: Waltz of the Flowers",
      composerId: "tchaikovsky",
      composerName: "표트르 차이콥스키",
      opus: "Op. 71a",
      year: "1892",
      signatureRank: 2,
      moods: ["heroic", "relax"],
      albumArt: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      description: "화려한 하프 카덴차와 호른의 낭만적인 왈츠가 펼치는 동화 속 화려한 무도회.",
      backgroundStory: "크리스마스이브의 마법 같은 모험을 그린 발레곡으로, 눈 덮인 겨울날 마음을 따뜻하게 녹여주는 축제의 선율입니다.",
      interpretation: "눈부신 하프 솔로 오프닝에 이어 호른 4중주가 부드럽게 주선율을 열며 우아한 회전 왈츠로 이어집니다.",
      movements: [
        { no: "꽃의 왈츠", title: "Tempo di Valse", tempo: "우아한 왈츠 템포로", desc: "하프의 독주와 호른 앙상블이 이끄는 화려한 왈츠" }
      ],
      searchQuery: "Tchaikovsky Waltz of the Flowers Gergiev"
    }
  ],

  curatedPlaylists: [
    {
      id: "pl-study",
      title: "몰입과 작업을 위한 집중 선율",
      subtitle: "잡념을 지우고 뇌를 맑게 깨우는 지적인 클래식",
      cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["bach-cello-suite-1", "chopin-raindrop", "bach-air-on-g", "beethoven-elise"]
    },
    {
      id: "pl-midnight",
      title: "새벽 두 시, 혼자만의 사색",
      subtitle: "세상의 소음이 멎은 시간, 내면과 마주하는 시간",
      cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["debussy-clair-de-lune", "chopin-nocturne-9-2", "beethoven-moonlight", "mozart-pc-21-andante"]
    },
    {
      id: "pl-rainy",
      title: "비 오는 날의 클래식 다락방",
      subtitle: "촉촉한 공기 속에서 더욱 선명해지는 첼로와 건반의 온기",
      cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["chopin-raindrop", "bach-air-on-g", "chopin-tristesse", "tchaikovsky-swan-lake"]
    },
    {
      id: "pl-masterpiece",
      title: "입문자를 위한 불멸의 시그니처 TOP 5",
      subtitle: "들으면 누구나 아는 거장들의 대표곡 컬렉션",
      cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["beethoven-moonlight", "beethoven-fate", "chopin-nocturne-9-2", "mozart-eine-kleine", "debussy-clair-de-lune"]
    }
  ]
};
