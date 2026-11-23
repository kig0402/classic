# 🎼 OPUS (오푸스) - 클래식 음악 추천 & 도슨트 웹 앱

> **배포 목표 URL**: [https://kig0402.github.io/classic](https://kig0402.github.io/classic)

---

## 📂 파일 구성 안내

본 폴더에는 GitHub Pages에 바로 업로드하여 1분 안에 배포할 수 있는 웹 애플리케이션 파일들이 모두 준비되어 있습니다.

- **`index.html`**: 메인 웹 페이지 (오늘의 명곡, 분위기 필터, 작곡가 도감, AI 소믈리에 입력창 등)
- **`style.css`**: 클래식 명품 다크 & 앤틱 골드 테마 디자인, LP 회전 애니메이션, 반응형 모바일 UI
- **`data.js`**: 베토벤, 쇼팽, 모차르트, 바흐, 드뷔시, 차이콥스키 등 작곡가 정보, 대표곡 배경 스토리, 악장(Movement) 구성, 고화질 앨범 아트 데이터셋
- **`app.js`**: 딥링크 음원 재생(YouTube Music, Spotify), 모달 팝업, 무드 필터링, 실시간 검색, AI 소믈리에 추천 로직
- **`README.md`**: 본 배포 설명서

---

## 🚀 GitHub 웹사이트에서 1분 만에 배포하는 방법

컴퓨터에 Git 명령어를 설치하지 않아도 **웹 브라우저의 GitHub 화면에서 직접 업로드**할 수 있습니다.

### 1단계: GitHub에서 새 저장소(Repository) 만들기
1. 웹 브라우저에서 [GitHub(github.com)](https://github.com/)에 로그인합니다.
2. 우측 상단의 **`+`** 버튼을 누르고 **`New repository`**를 클릭합니다.
3. 설정 입력:
   - **Repository name**: `classic` (반드시 영문 소문자 `classic`으로 입력)
   - **Public**으로 선택 (무료 배포를 위해 필수)
   - *Add a README file* 체크는 해제하거나 그대로 둡니다.
4. 초록색 **[Create repository]** 버튼을 클릭합니다.

---

### 2단계: 파일 업로드하기
1. 새로 생성된 `classic` 저장소 화면에서 **`uploading an existing file`** 링크를 클릭합니다.  
   *(또는 우측 상단의 `Add file` ➔ `Upload files` 선택)*
2. 아래 4개 핵심 파일을 드래그하여 업로드 영역에 끌어다 놓습니다:
   - ✅ **`index.html`**
   - ✅ **`style.css`**
   - ✅ **`data.js`**
   - ✅ **`app.js`**
   - (선택) `README.md`
3. 페이지 하단의 **[Commit changes]** 버튼을 클릭하여 저장합니다.

---

### 3단계: GitHub Pages 무료 웹 호스팅 켜기
1. 저장소 상단 메뉴의 **`Settings` (⚙️ 설정)** 탭을 클릭합니다.
2. 왼쪽 사이드바 메뉴에서 **`Pages`** 항목을 클릭합니다.
3. **Build and deployment** 섹션의 **Branch** 설정:
   - `None`으로 되어 있는 드롭다운을 클릭하여 **`main`** (또는 `master`) 브랜치로 변경합니다.
   - 우측 폴더는 **`/(root)`** 그대로 둡니다.
   - **[Save]** 버튼을 누릅니다.

---

### 4단계: 배포 확인
- 약 1~2분 정도 지나면 상단에 다음과 같은 메시지가 나타납니다:  
  **"Your site is live at https://kig0402.github.io/classic"**
- 링크를 클릭하면 전 세계 누구나 접속할 수 있는 클래식 음악 추천 앱이 정상 작동합니다! 🎉
