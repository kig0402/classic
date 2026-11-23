/**
 * OPUS (오푸스) - Classical Music Dataset
 * 작곡가 정보, 대표곡, 곡 배경과 해석, 악장별 구성, 분위기 태그, 앨범 아트워크
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
      bio: "인류 역사상 가장 위대한 작곡가 중 한 명으로, 고전주의 양식을 완성하고 낭만주의의 새 지평을 열었습니다. 20대 후반부터 시작된 청력 상실이라는 치명적인 고통을 극복하고 불멸의 걸작들을 남겼습니다.",
      funFact: "베토벤은 매일 아침 커피를 끓일 때 정확히 원두 60알을 세어서 마시는 지독한 완벽주의자였습니다."
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
      bio: "'피아노의 시인'으로 불리며, 평생 거의 모든 작품을 피아노곡으로만 작곡했습니다. 고국 폴란드를 향한 그리움과 특유의 서정적이고 섬세한 루바토(Rubato) 선율로 낭만주의 피아노 음악의 정점을 이루었습니다.",
      funFact: "체구가 매우 가냘팠던 쇼팽은 대규모 콘서트홀보다 친밀한 살롱(Salon)에서 연주하는 것을 훨씬 선호했습니다."
    },
    {
      id: "mozart",
      name: "볼프강 아마데우스 모차르트",
      nameEn: "Wolfgang Amadeus Mozart",
      era: "고전주의 (Classical)",
      years: "1756 - 1791",
      country: "오스트리아",
      avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      quote: "음악은 결코 귀를 괴롭혀서는 안 되며, 언제나 귀를 즐겁게 하여 음악으로 남아 있어야 한다.",
      bio: "인류 역사상 최고의 음악 신동. 5세에 작곡을 시작하여 교향곡, 오페라, 협주곡 등 모든 음악 장르에서 완벽한 균형미와 천진난만한 천재성을 담은 걸작들을 쏟아냈습니다.",
      funFact: "유쾌하고 짓궂은 성격이었던 모차르트는 친구들과 가족에게 보낸 편지에 기상천외한 농담과 장난을 가득 남겼습니다."
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
      bio: "'음악의 아버지'라 불리며 바로크 대위법과 화성학을 완성한 서양 음악사의 거대한 기둥입니다. 수학처럼 정교하고 완벽한 건축물 같은 음악적 질서 속에 깊은 종교적 영성을 담아냈습니다.",
      funFact: "바흐는 일생 동안 1,000곡이 넘는 방대한 작품을 남겼으며, 20명의 자녀 중 여러 명을 훌륭한 음악가로 키워냈습니다."
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
      bio: "전통적인 화성과 조성의 틀을 깨고 몽환적인 음색과 빛의 질감을 음악으로 묘사한 프랑스 인상주의 음악의 창시자입니다. 모네의 그림이나 말라르메의 시처럼 감각적인 울림을 선사합니다.",
      funFact: "드뷔시는 바다를 사랑해서 악보 표지에 가쓰시카 호쿠사이의 우키요에 파도 그림을 넣도록 직접 주문하기도 했습니다."
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
      bio: "러시아 특유의 짙은 우수와 애수, 그리고 가슴을 울리는 극적인 멜로디의 대가입니다. '백조의 호수', '호두까기 인형' 등 불후의 발레곡과 장대한 교향곡으로 전 세계인의 사랑을 받고 있습니다.",
      funFact: "차이콥스키는 폰 메크 부인이라는 후원자로부터 13년간 거액의 후원을 받았지만, 단 한 번도 직접 얼굴을 마주치지 않는다는 독특한 조건을 지켰습니다."
    }
  ],

  moods: [
    { id: "all", name: "전체보기", icon: "✨", desc: "모든 클래식 명곡" },
    { id: "dawn", name: "새벽 감성 & 사색", icon: "🌙", desc: "깊은 밤, 고요한 생각에 잠기고 싶을 때" },
    { id: "focus", name: "깊은 몰입 & 스터디", icon: "📚", desc: "집중력과 작업 효율을 극대화하는 선율" },
    { id: "rainy", name: "비 오는 날의 서정", icon: "🌧️", desc: "창밖 빗소리와 어우러지는 아련한 첼로와 피아노" },
    { id: "relax", name: "휴식 & 수면", icon: "☕", desc: "지친 하루를 보듬고 편안한 잠으로 이끄는 선율" },
    { id: "heroic", name: "열정 & 벅찬 활력", icon: "🔥", desc: "가슴을 뛰게 하고 무기력함을 깨우는 웅장함" }
  ],

  pieces: [
    {
      id: "piece-1",
      title: "피아노 소나타 14번 C#단조 '월광'",
      titleEn: "Piano Sonata No. 14 in C-sharp minor 'Moonlight'",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 27 No. 2",
      year: "1801",
      moods: ["dawn", "rainy", "focus"],
      albumArt: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      artCaption: "달빛이 비치는 잔잔한 밤의 호수",
      description: "베토벤의 가장 대중적인 걸작. 실연의 애절함과 고뇌, 그리고 3악장의 격정적인 분노가 폭풍처럼 몰아칩니다.",
      backgroundStory: "1801년 베토벤이 귓병의 악화로 깊은 절망에 빠져 있던 시기에 작곡되었습니다. 그는 14세 연하의 귀족 제자 줄리에타 귀차르디를 깊이 사랑했으나, 신분의 벽과 집안의 반대로 결혼하지 못하고 실연의 아픔을 겪었습니다. 베토벤은 이 곡을 그녀에게 헌정했습니다. '월광(Moonlight)'이라는 부제는 시인 루트비히 렐슈타프가 1악장을 듣고 '스위스 루체른 호수의 달빛 아래 흔들리는 조각배 같다'고 묘사한 데서 유래했습니다.",
      interpretation: "1악장은 조용하고 몽환적인 아르페지오 위에 슬픈 탄식 같은 멜로디가 지속됩니다. 2악장은 잠시 찾아온 우아한 미소이며, 3악장은 억눌렸던 운명에 대한 분노와 정열이 건반 위를 질주하는 드라마틱한 대조를 이룹니다.",
      movements: [
        { no: "1악장", title: "Adagio sostenuto", tempo: "느리고 차분하게", desc: "잔잔한 호수 위에 비친 달빛과 가슴 시린 멜랑콜리" },
        { no: "2악장", title: "Allegretto", tempo: "경쾌하게", desc: "리스트가 '두 심연 사이에 핀 한 송이 꽃'이라 칭송한 우아한 미뉴에트" },
        { no: "3악장", title: "Presto agitato", tempo: "격정적이고 매우 빠르게", desc: "운명의 벽을 부술 듯 몰아치는 압도적인 아르페지오와 분노" }
      ],
      searchQuery: "Beethoven Moonlight Sonata Barenboim"
    },
    {
      id: "piece-2",
      title: "교향곡 제5번 C단조 '운명'",
      titleEn: "Symphony No. 5 in C minor",
      composerId: "beethoven",
      composerName: "루트비히 판 베토벤",
      opus: "Op. 67",
      year: "1808",
      moods: ["heroic"],
      albumArt: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      artCaption: "폭풍우를 뚫고 솟아오르는 웅장한 봉우리",
      description: "‘빠바바밤-’ 온 인류가 아는 모티프. 가혹한 운명에 맞서 싸워 마침내 승리의 환희를 쟁취하는 드라마.",
      backgroundStory: "베토벤의 제자 신들러에 따르면, 도입부의 4개 음을 가리켜 '운명은 이처럼 문을 두드린다'고 말했다 하여 '운명'이라는 별칭이 붙었습니다. 빈의 극심한 정치적 혼란과 나폴레옹 전쟁, 그리고 완전히 귀가 먹어가는 비극 속에서 베토벤은 절망에 굴복하지 않고 4년에 걸쳐 이 불후의 걸작을 완성했습니다.",
      interpretation: "어두운 C단조로 시작하여 고통과 투쟁을 거쳐, 4악장에서 찬란한 C장조로 폭발하는 구성은 서양 음악사에서 '암흑에서 광명으로(Per aspera ad astra)'의 영웅적 서사를 정립한 가장 모범적인 예시입니다.",
      movements: [
        { no: "1악장", title: "Allegro con brio", tempo: "빠르고 생기있게", desc: "운명의 동기 4음이 집요하게 발전하며 긴장감을 극대화" },
        { no: "2악장", title: "Andante con moto", tempo: "느리지만 활기차게", desc: "마음을 어루만지는 따뜻한 비올라와 첼로의 숭고한 변주곡" },
        { no: "3악장", title: "Scherzo. Allegro", tempo: "빠르고 날카롭게", desc: "저음현의 불길한 테마와 유머, 그리고 4악장으로 쉼 없이 이어지는 신비로운 연결" },
        { no: "4악장", title: "Allegro", tempo: "당당하고 장엄하게", desc: "트롬본과 피콜로가 최초로 교향곡에 합류하며 터져 나오는 압도적 승리의 환희" }
      ],
      searchQuery: "Beethoven Symphony No 5 Carlos Kleiber"
    },
    {
      id: "piece-3",
      title: "야상곡(녹턴) 제2번 Eb장조",
      titleEn: "Nocturne in E-flat major",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 9 No. 2",
      year: "1832",
      moods: ["dawn", "relax", "focus"],
      albumArt: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      artCaption: "은은한 햇살이 비치는 아늑한 안식처",
      description: "세상에서 가장 사랑받는 피아노 야상곡. 마치 꿈결 속을 걷는 듯한 달콤하고 부드러운 선율.",
      backgroundStory: "쇼팽이 20대 초반 조국 폴란드를 떠나 파리에 도착한 직후 작곡된 곡입니다. 당시 파리의 귀족 살롱에서 쇼팽의 시적인 연주에 매료된 귀족 부인 마리 플레옐에게 헌정되었습니다. 쇼팽의 21개 녹턴 중 대중적으로 가장 유명하며, 수많은 영화와 광고의 배경음악으로 쓰였습니다.",
      interpretation: "왼손의 안정적인 왈츠풍 반주 위에 오른손이 이탈리아 오페라의 '벨칸토' 창법처럼 노래하듯 선율을 얹습니다. 반복될 때마다 장식음이 정교하고 보석처럼 화려하게 변주되는 것이 감상 포인트입니다.",
      movements: [
        { no: "단일 악장", title: "Andante", tempo: "느리게 걷듯이", desc: "감미롭고 우아한 주제 선율과 화려한 카덴차로 마무리되는 밤의 서정" }
      ],
      searchQuery: "Chopin Nocturne Op 9 No 2 Rubinstein"
    },
    {
      id: "piece-4",
      title: "빗방울 전주곡 (프렐류드 15번)",
      titleEn: "Prelude in D-flat major 'Raindrop'",
      composerId: "chopin",
      composerName: "프레데리크 쇼팽",
      opus: "Op. 28 No. 15",
      year: "1839",
      moods: ["rainy", "dawn", "focus"],
      albumArt: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
      artCaption: "유리창을 타고 흘러내리는 투명한 빗방울",
      description: "지속해서 똑똑 떨어지는 빗방울 소리. 사랑과 불안, 그리고 요양지의 고독이 어우러진 명곡.",
      backgroundStory: "쇼팽은 건강이 악화되자 연인인 소설가 조르주 상드와 함께 스페인 마요르카 섬의 발데모사 수도원으로 요양을 떠났습니다. 하지만 섬의 겨울은 춥고 습했으며 끝없는 비가 내렸습니다. 상드가 장을 보러 나가 폭풍우로 돌아오지 못하자, 홀로 남겨진 쇼팽은 죽음의 공포와 환각 속에서 지붕에서 떨어지는 빗방울 소리를 들으며 이 곡을 썼습니다.",
      interpretation: "곡 전체를 관통하는 Ab(G#) 음의 지속적인 연타음이 바로 처마 끝에서 떨어지는 빗방울입니다. 맑고 온화한 앞부분과 달리, 중간부 C#단조에서는 검은 구름과 천둥번개가 치듯 어둡고 공포스러운 화음이 몰아칩니다.",
      movements: [
        { no: "단일 악장", title: "Sostenuto", tempo: "음 하나하나를 충실히 눌러서", desc: "빗방울 연타음 위에 펼쳐지는 고요한 멜로디와 중간부의 격렬한 긴장" }
      ],
      searchQuery: "Chopin Raindrop Prelude Seong-Jin Cho"
    },
    {
      id: "piece-5",
      title: "피아노 협주곡 21번 C장조 2악장 안단테",
      titleEn: "Piano Concerto No. 21 in C major, II. Andante",
      composerId: "mozart",
      composerName: "볼프강 아마데우스 모차르트",
      opus: "K. 467",
      year: "1785",
      moods: ["relax", "dawn", "focus"],
      albumArt: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      artCaption: "천상의 평화를 품은 에메랄드빛 바다",
      description: "스웨덴 영화 '엘비라 마디간'의 테마곡으로 유명한, 세상에서 가장 평화롭고 순수한 안식의 멜로디.",
      backgroundStory: "1785년 모차르트가 오스트리아 빈에서 피아니스트이자 작곡가로서 최고의 인기를 누리던 황금기에 작곡되었습니다. 자신이 주최하는 예약 음악회에서 직접 연주하기 위해 쓴 곡으로, 작곡한 지 불과 며칠 만에 대중 앞에 선보여 엄청난 갈채를 받았습니다.",
      interpretation: "약음기를 낀 현악기들이 물결치듯 잔잔한 삼연음표 반주를 깔아주면, 독주 피아노가 한 점 티 없는 맑은 목소리로 노래를 시작합니다. 슬픔조차도 천상의 순수함으로 승화시킨 모차르트 음악의 극치입니다.",
      movements: [
        { no: "1악장", title: "Allegro maestoso", tempo: "장엄하고 빠르게", desc: "행진곡풍의 당당하고 화려한 오케스트라와 피아노의 향연" },
        { no: "2악장", title: "Andante", tempo: "느리게 걷듯이", desc: "영화 '엘비라 마디간' 삽입곡, 천상의 평온함을 선사하는 서정의 극치" },
        { no: "3악장", title: "Allegro vivace assai", tempo: "매우 빠르고 활기차게", desc: "재치와 위트가 넘쳐흐르는 눈부신 피날레 론도" }
      ],
      searchQuery: "Mozart Piano Concerto 21 Andante Pollini"
    },
    {
      id: "piece-6",
      title: "G선상의 아리아 (관현악 모음곡 3번)",
      titleEn: "Air on the G String (Orchestral Suite No. 3)",
      composerId: "bach",
      composerName: "요한 제바스티안 바흐",
      opus: "BWV 1068",
      year: "1730",
      moods: ["relax", "focus", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      artCaption: "안개 자욱한 숲속으로 스며드는 아침 햇살",
      description: "바이올린의 가장 굵고 따뜻한 줄 하나(G선)만으로 연주되는, 영혼을 어루만지는 신성한 기도.",
      backgroundStory: "원래 바흐의 관현악 모음곡 3번의 2곡 '에어(Air: 노래)'였으나, 19세기 독일 바이올리니스트 아우구스트 빌헬미가 바이올린의 가장 낮은 줄인 'G선' 하나만으로 연주할 수 있도록 편곡하면서 'G선상의 아리아'라는 이름으로 전 세계에 널리 알려졌습니다.",
      interpretation: "베이스의 연속적인 하강 선율(통주저음)이 장엄하고 흔들림 없는 대지를 형성하면, 바이올린의 긴 선율이 하늘을 향해 날아오르듯 영적인 위안과 신성한 감동을 선사합니다.",
      movements: [
        { no: "단일 곡", title: "Air", tempo: "느리고 서정적으로", desc: "하강하는 베이스라인 위에 얹힌 천상의 노래" }
      ],
      searchQuery: "Bach Air on the G String HAUSER"
    },
    {
      id: "piece-7",
      title: "무반주 첼로 모음곡 1번 G장조 '프렐류드'",
      titleEn: "Cello Suite No. 1 in G major 'Prelude'",
      composerId: "bach",
      composerName: "요한 제바스티안 바흐",
      opus: "BWV 1007",
      year: "1720",
      moods: ["focus", "dawn", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
      artCaption: "따뜻한 나무 향이 감도는 고서점의 오후",
      description: "첼로라는 악기가 낼 수 있는 가장 깊고 순수한 울림. 세상의 소음을 지우고 마음에 평안을 채웁니다.",
      backgroundStory: "바흐 생전에는 그저 연습용 악보 취급을 받으며 거의 200년 동안 잊혀 있었습니다. 하지만 1889년 13세의 천재 첼리스트 파블로 카잘스가 바르셀로나의 고서점에서 먼지 쌓인 악보를 발견하고 12년간 연구한 끝에 세상에 연주하여 '첼로의 성서'로 부활시켰습니다.",
      interpretation: "반주 없이 단 하나의 첼로가 화성과 멜로디를 동시에 직조해 나갑니다. 단순한 아르페지오의 반복 속에서 펼쳐지는 파동은 듣는 이의 심장 박동과 호흡을 차분하게 안정시켜 줍니다.",
      movements: [
        { no: "1곡", title: "Prélude", tempo: "흐르듯이 유려하게", desc: "자연의 물결처럼 넘실대며 전설이 된 불멸의 오프닝" }
      ],
      searchQuery: "Bach Cello Suite No 1 Prelude Yo-Yo Ma"
    },
    {
      id: "piece-8",
      title: "베르가마스크 모음곡 중 제3곡 '달빛'",
      titleEn: "Suite bergamasque, III. Clair de lune",
      composerId: "debussy",
      composerName: "클로드 드뷔시",
      opus: "L. 75",
      year: "1890",
      moods: ["dawn", "relax", "rainy"],
      albumArt: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=800&q=80",
      artCaption: "은빛 호수 위로 유영하는 신비로운 달 그림자",
      description: "밤하늘의 은은한 달빛과 고요한 공기의 떨림. 프랑스 인상주의 피아노 음악의 가장 신비로운 정수.",
      backgroundStory: "드뷔시가 프랑스 시인 폴 베를렌의 시집 '우아한 향연(Fêtes galantes)'에 수록된 시 '달빛'에서 영감을 받아 작곡했습니다. '그대의 영혼은 은밀한 풍경...'으로 시작하는 시의 구절처럼, 감정을 직접 쏟아내기보다 빛과 색채, 공기의 미묘한 뉘앙스를 음악적 음영으로 포착했습니다.",
      interpretation: "박자감이 느껴지지 않을 정도로 유려하고 자유로운 9/8박자 아르페지오가 특징입니다. 건반을 누르는 타격음이 아니라, 음과 음 사이의 잔향과 페달의 여운을 감상해야 하는 곡입니다.",
      movements: [
        { no: "제3곡", title: "Clair de lune", tempo: "매우 고요하게 표현을 담아", desc: "빛과 그림자가 교차하며 마음을 씻어내리는 서정적 몽상" }
      ],
      searchQuery: "Debussy Clair de lune Seong-Jin Cho"
    },
    {
      id: "piece-9",
      title: "백조의 호수 모음곡 중 '정경(Scene)'",
      titleEn: "Swan Lake Suite, Op. 20a: Scene",
      composerId: "tchaikovsky",
      composerName: "표트르 차이콥스키",
      opus: "Op. 20a",
      year: "1876",
      moods: ["rainy", "heroic"],
      albumArt: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=800&q=80",
      artCaption: "달빛 아래 날개를 펼치는 우아한 백조",
      description: "오보에의 애수 어린 독주로 시작하여 웅장한 오케스트라로 번지는 마법 같은 환상곡.",
      backgroundStory: "악마 로트바르트의 저주로 낮에는 백조로, 밤에만 인간으로 변하는 오데트 공주의 슬픈 사랑 이야기를 담은 발레곡입니다. 초연 당시에는 연주가 너무 어렵고 복잡하다며 혹평을 받았으나, 차이콥스키 사후 재안무를 거쳐 세계에서 가장 사랑받는 발레 클래식의 상징이 되었습니다.",
      interpretation: "하프의 아르페지오가 신비로운 호수의 물결을 그리면, 오보에가 오데트 공주의 눈물 같은 테마를 노래합니다. 점차 금관악기와 팀파니가 가세하며 저주와 운명의 소용돌이를 묘사합니다.",
      movements: [
        { no: "대표 정경", title: "Moderato", tempo: "보통 빠르기로", desc: "오보에의 애절한 솔로와 장엄한 백조의 비상 테마" }
      ],
      searchQuery: "Tchaikovsky Swan Lake Scene Valery Gergiev"
    }
  ],

  curatedPlaylists: [
    {
      id: "pl-study",
      title: "몰입과 작업을 위한 집중 피아노",
      subtitle: "마음을 차분하게 가라앉히고 뇌를 깨우는 지적인 선율",
      cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["piece-7", "piece-4", "piece-6", "piece-1"]
    },
    {
      id: "pl-midnight",
      title: "새벽 두 시, 혼자만의 사색",
      subtitle: "하루의 소음이 멎은 시간, 내면과 마주하는 시간",
      cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["piece-8", "piece-3", "piece-1", "piece-5"]
    },
    {
      id: "pl-rainy",
      title: "비 오는 날의 클래식 다락방",
      subtitle: "젖은 공기 속에서 더욱 선명해지는 첼로와 건반의 온기",
      cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["piece-4", "piece-6", "piece-7", "piece-9"]
    },
    {
      id: "pl-masterpiece",
      title: "클래식 입문자를 위한 필수 명곡 TOP 5",
      subtitle: "들으면 바로 아는 거장들의 시그니처 멜로디 컬렉션",
      cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
      pieceIds: ["piece-1", "piece-2", "piece-3", "piece-5", "piece-8"]
    }
  ]
};
