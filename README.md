# 항해 99 9기 4조 실전 프로젝트 - Status!

![브로셔](https://user-images.githubusercontent.com/86880916/206968459-29afd585-0182-40a0-baeb-624c45adce27.png)

---

### 📖 프로젝트 소개

> [statUs] 원활한 팀 업무와 팀 내 커뮤니케이션을 도와주는 서비스
>
> 팀의 일정을 확인한다!
> 누가 어떤 일정이 있는지 확인한다!
> 팀원이 어떤 상태인지 보여준다! <br/>
>
> 🚌 [Status 서비스 이용하기](https://www.status.gift/) <br />
> 🗒 [Status 노션 바로가기](https://obsidian-pig-183.notion.site/statUs-d2e9ed521e204b79ab20263e8823e744) <br />

### 🗓️ 프로젝트 운영 기간

- 개발 기간: 2022년 11월 11일 ~ 2022년 12월 16일
- 운영 기간: 2022년 12월 07일 ~ 2022년 12월 15일
---

![브로셔](![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d460e99-9cc1-4e9e-b282-b12ebb74bd1f/Untitled.png))

---

### 👥 프론트엔드 팀원 소개

👨🏻‍💻 한세준: [https://github.com/hansejun/](https://github.com/hansejun/)

👨🏻‍💻 안치영: [https://github.com/Returnmakdo](https://github.com/Returnmakdo)

### 👥 백엔드 팀원 소개

👨🏻‍💻 김정현: [https://github.com/1005jh](https://github.com/1005jh)

👨🏻‍💻 정현진: [https://github.com/hyunjin9603](https://github.com/hyunjin9603)

👨🏻‍💻 유동희: [https://github.com/donghee44](https://github.com/donghee44)

### 👥 디자이너 팀원 소개

👨🏻‍💻 문예진

---

### 💚 **주요 기능**

- ## **회원가입 및 로그인** <br>

  - 이메일 인증을 통한 회원가입
  - 카카오 로그인을 통한 간편한 회원가입 및 로그인 기능
  - 로그인 시 가장 최근에 접속한 그룹 페이지로 이동
  <hr/>

- ## **캘린더 및 상태등록** <br>

  - 상태에 대한 색상을 등록하여 일정 작성 ex) 휴가중, 연차, 출장 등...
  - 작성한 회원이 아닐 시 수정 불가
  - 드래그앤드롭을 통한 일정 수정
    <br><br>
    <img src="https://user-images.githubusercontent.com/86880916/207003947-b7e3d38b-98ba-454d-ab3d-c4145e578d81.gif" width="80%"  >

- ## **게시판** <br>

  - 자유게시판과 공지게시판으로 나누어 보여줌
  - 자유게시판에 게시글을 등록하여 공지게시판으로 이동 가능
  - 좋아요 및 댓글 작성 가능
  - 작성한 글은 요약된 정보로 보여지며 클릭을 통해 상세 게시글 모달을 확인 가능
  - 상세 게시글 모달에서는 게시글에 대한 전체 정보가 보여지며 이미지 클릭을 통해 상세 이미지를 슬라이드로 확인 가능
    <br><br>
    <img src="https://user-images.githubusercontent.com/86880916/207004487-dbe8b405-36b8-437f-ba31-df96dc546937.gif" width="80%"  >
    <img src="https://user-images.githubusercontent.com/86880916/207005646-dbc2c0b1-abec-4179-a933-da0be2b7872f.gif" width="80%">

- ## **그룹 회원 상태** <br>

  - 속한 그룹내에서 상태메시지와 상태 아이콘 등록 가능
  - 상태 아이콘은 유저의 오른쪽에 표시되며 마우스를 올려놓을 시에 해당 유저의 상태 메시지 확인 가능
  - 해당 그룹의 접속하고 있는 유저들을 실시간으로 표시
    <br><br>
    <img src="https://user-images.githubusercontent.com/86880916/207005834-2d2914be-6813-4d06-94c4-602e509f5e04.gif" width="80%">

- ## **그룹 생성 및 초대** <br>

  - 그룹에서 유저 초대 가능
  - 오른쪽 상단의 알림 아이콘을 클릭하면 받은 초대 목록을 보여줌
  - 초대 수락시에 해당 그룹으로 이동
    <br><br>
    <img src="https://user-images.githubusercontent.com/86880916/207005907-78edce7f-c10e-433b-a574-59eb99db9de8.gif" width="80%">
    <img src="https://user-images.githubusercontent.com/86880916/207006002-e4cf1c35-322a-4fad-9988-321a5325b688.gif" width="80%">

- ## **실시간 채팅** <br>
  - 그룹내의 유저와 실시간 1대1 채팅
  - 상대방이 메시지를 읽지 않았을 경우 상대방의 화면에서 읽지 않은 메시지 수 표시
    <br><br>
    <img src="https://user-images.githubusercontent.com/86880916/207006068-77bb8920-8ed6-4149-8635-363c3fc25d6e.gif" width="80%">

---

### ✅ **담당 작업**

👷🏻‍♂️ 김정현

- 그룹,스케쥴,초대,게시판,댓글,룸,채팅,이미지 기능구현
- redis 데이터 캐싱
- lambda 이미지 리사이징
- socket.io : 실시간 채팅 / 안읽은 메시지 알림 / 실시간 접속 유저 표시
- CICD
- swagger
- morgan/winton 에러로그 저장
- 부하테스트 (artillery)
- test
- nginx(https , Load Balancer)
- 전반적인 에러수정 및 피드백 반영
- 데이터 관계 설정

👷🏻‍♂️ 정현진

- 로그인, 회원가입, 유저프로필, 닉네임/비밀번호 변경 구현
- 그룹내 유저, 컬러, 게시글/댓글 좋아요 구현
- 카카오 소셜로그인 : axios 사용 구현
- 구글/네이버 소셜로그인 : passport 구현
- nodemailer (네이버메일)
- 로그인 미들웨어
- nginx (https)
- jwt
- test
- DB 모델 설계(ERD)

👷🏻‍♂️ 유동희

- 스케쥴, 그룹, 컬러 CRUD
- socket.io 채팅

---

### 💬 기술적 의사결정

<img src="https://img.shields.io/badge/-node.js-green?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-lambda-orange?style=for-the-badge&logo=Lambda&logoColor=black"/>&nbsp;
<img src="https://img.shields.io/badge/-S3-orange?style=for-the-badge&logo=S3&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-multer-orange?style=for-the-badge&logo=Multer&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/-Nginx-green?style=for-the-badge&logo=Nginx&logoColor=white">
<img src="https://img.shields.io/badge/-axios-black?style=for-the-badge&logo=axios&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-morgan-green?style=for-the-badge&logo=Morgan&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-winston-green?style=for-the-badge&logo=winston&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-redis-red?style=for-the-badge&logo=redis&logoColor=white"/>&nbsp;
<br>

<img src="https://img.shields.io/badge/-sequelize-blue?style=for-the-badge&logo=Sequelize&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-artillery-black?style=for-the-badge&logo=Artillery&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-mysql-blue?style=for-the-badge&logo=Mysql&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/-CICD-blue?style=for-the-badge&logo=CICD&logoColor=white"/>&nbsp;

| 사용 기술          | 기술 결정 이유                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Socket.io`        | webSocket의 경우 브라우저 별로 지원 버전이 다르거나 지원하지 않는 경우도 있어서 일관된 서비스를 제공하기 위해서 socket.io를 적용하였습니다.                                                                                                                                                                                                                                                              |
| `redis`            | In-Memory 기반의 Dictionary 구조 데이터관리 서버로 key-value의 데이터 구조로 단순하게 저장하기 때문에 관계형 데이터베이스와 같이 쿼리 연산을 지원하지 않지만, 데이터의 고속읽기와 쓰기에 최적화가 되어 있고, 메모리에 데이터를 저장하기 때문에 작업 속도가 빠른 장점을 이용해 데이터를 캐싱하여 서버의 부담을 줄이기 위해 사용했습니다.                                                                  |
| `lambda`           | 이미지 리사이징 작업이 CPU와 메모리를 많이 사용하기 때문에 로컬서버에서 작업을 돌리면 다른 사용자의 요청을 못 받는 현상이 생길 수 있고, node.js의 특성상 비동기프로그래밍 기반으로 I/O 작업에 유리하고 CPU작업에 불리하기 때문에 S3를 트리거로 사용할 수 있는 lambda를 사용하게 됐습니다.                                                                                                                |
| `git action(CICD)` | 반복적 빌드, 테스트 및 배포작업을 처리하고, 문제가 있으면 경고를 해주는 자동화 파이프라인을 통해 코드변경을 원활하게 할 수 있어 선택했습니다. <br> <br>jenkins를 사용하면 내 컴퓨터상에서 관리를 할 수 있는 장점이 있지만 git action을 사용함으로써 github과 통일된 환경에서 CICD를 수행할 수 있고, 보다 친숙한 문법의 yaml파일로 간단하게 파이프라인을 구성할 수 있기 때문에 git action을 선택했습니다. |
| `Nginx`            | https를 적용해 사용자가 사이트에 제공하는 정보를 암호화하여 보안을 강화하고 현재 프로젝트의 사이즈와 사용자 수 및 비용적인 면을 고려해 ELB보다 Nginx를 Load Balancer로 서버의 부하를 분산시키고 응답속도를 높이는데 더 효과적일거라 판단하고 사용했습니다.                                                                                                                                               |
| `axios`            | response timeout (fetch에는 없는 기능) 처리 방법이 존재 Promise 기반으로 만들어졌기 때문에 데이터를 다루기 편리합니다. 크로스 브라우징 최적화로 브라우저 호환성(구형 브라우저 지원)이 뛰어납니다.                                                                                                                                                                                                        |
| `artillery`        | JMETER라는 툴도 있지만 우리에게 친숙한 코드로 부하테스트를 진행할 수 있다는 점에서 사용하게 됐습니다.                                                                                                                                                                                                                                                                                                    |
| `mysql `           | 관계형 데이터베이스 관리 시스템으로 사용하기 쉽고 빠르고 안정적인 면과 데이터를 다양한 형식으로 저장하고 고유한 스키마를 정의할 수 있도록 하여 뛰어난 유연성을 제공하기 때문에 사용하게 됐습니다.                                                                                                                                                                                                        |
| `sequelize `       | 객체지향적 코드로 직관적이며 로직에 더욱 집중할 수 있게 해주고, 유지보수가 좋다는 점 그리고 DBMS에 대한 종속성이 줄어들게 하며 쿼리문을 javascript로 사용할 수 있는 장점이 있어 보다 클린하게 코드를 작성하고 데이터를 가공하는 쪽에 더 집중할 수 있다는 점에서 사용하게 됐습니다.                                                                                                                       |

---

### ❌ 트러블 슈팅

---

<details>
  <summary>Lambda Access denied</summary>

- **문제 상황**
  - S3 버켓에 이미지가 올라가지만 lambda 트리거가 작동을 하지 않고 access denied 403 에러를 띄움
- **첫번째 접근**
  - access denied가 뜨므로 권한에서 문제가 있는 것으로 판단하고 IAM 권한쪽으로 수정하고 다시시도 → 실패(access denied 403) → ㄹ다시 처음부터 AWS 세팅 → 실패(access denied 403)
- **두번째 접근**
  - AWS의 세팅에 문제가 없으면 lambda에 문제가 있을 것이라 판단하고 함수와 트리거 수정하고 다시시도 → 실패(access denied 403) → lambda와 s3를 다시 만들며 진행 → 실패(access denied 403)
- **세번째 접근(해결)**

  - lambda와 권한을 건드려봤으나 해결이 되지 않아 multerMiddleware 코드 다시작성 시도 → 실패(access denied 403) → multer 세팅을 바꾸며 다시시도 → 이름을 현재날짜로만 바꿔줬을 때 성공

- **access denied가 해결된 이유?**
  > stackoverflow에서 검색하다가 발견한 글에 따르면 AWS는 객체가 없으면 404 NOT FOUND가 아니라 403 ACCESS DENIED를 띄운다고 합니다. 근데 저는 기존파일명에 날짜를 더해서 파일명을 정해주는 방식으로 진행을 했었고, 그렇기 때문에 S3에 한글로 된 파일명이 올라갈 때 한글이 깨져서 올라가게 됐습니다. 여기서 S3에는 올라가지만 lambda에서는 깨진 한글을 인식하지 못해 S3에 객체가 없다고 판단을 하고 access denied를 띄운 것이라 생각됩니다.
  </details>

<details>
  <summary>여러장의 이미지를 올렸을 때 S3에 몇장의 이미지가 소실되는 문제</summary>

- **문제 상황**
  - 여러장의 이미지를 올렸을 때 S3에 몇장의 이미지가 소실되는 문제
- **첫번째 접근**
  - multerMiddleware를 통과해서 S3에 이미지가 올라가므로 multerMiddleware를 사용하는 route 부분을 수정 → 실패
- **두번째 접근**

  - S3에 오류가 있는지 확인하다가 파일명이 크게 차이가 나지 않는 것을 파악 → 서로 명확한 차이를 주기 위해 랜덤숫자와 현재시간을 더해서 파일명을 만들어줌 → 성공

- **이미지가 왜 소실된걸까?**
  > 두번째 접근을 했을 때 파악하기로는 여러장의 이미지를 같이 올릴 때 몇장의 이미지의 파일명이 같게 되어 소실되는걸로 파악됩니다. 같은 파일명이 올라오기 때문에 S3에서는 하나의 파일로 인식하고 이름이 겹치는 파일이 사라지게 되었다.
  </details>

<details>
  <summary>Lambda가 인식하지 못하는 확장자명의 문제</summary>

- **문제 상황**
  - lambda가 인식하지 못하는 확장자명의 문제
- **첫번째 접근**
  - 확장자명에 제한을 두어 lambda가 인식하지 못하는 확장자명을 걸러내는 작업 → 성공 → 이미지 확장자명에 대해 모르는 사용자가 있을 것이라 판단 → 다른 해결방법 모색
- **두번째 접근**

  - 이미지 확장자명을 multerMiddleware에서 변경 → 성공 → 사용자가 이미지를 올릴 때 신경 쓸 일이 없게 됨 → 채택

- **lambda가 인식하지 못하는 JFIF, 변경해준 확장자명 webp**
  > lambda가 인식하지 못하는 확장자명이 있을 것이라는 생각을 크게 하지 못했습니다. 그저 jpg는 jpeg로 해줘야 한다는 것만 알고 있었는데 JFIF라는 확장자명이 들어왔을 때 1번 문제와 비슷하게 람다 트리거가 발동하지 않았습니다.
  > 확장자명을 변경하기로 했을 때 가장 흔한 JPEG로 했었는데 webp라는 확장자가 압축성도 뛰어나고 화질적인면에서도 png와 비슷하다는 걸 알게되어 webp라는 확장자명으로 변경해주게 되었습니다.
  > 물론 webp라는 확장자를 선택하므로 몇몇 브라우저에서 지원을 하지 않는 점과 브라우저의 버전에 따라 지원을 하지 않을 수 있다는 단점은 가져가야 하지만 webp를 썼을 때의 매리트가 충분히 크다고 생각되어 쓰게 되었습니다.
  </details>

<details>
  <summary>Redis 캐싱 관련 문제</summary>

- **문제 상황**
  - get 요청을 캐싱 했을 때 데이터가 전부가 똑같은 오류
- **첫번째 접근**
  - cacheMiddleware에서 redis.set 부분을 수정 → 실패
- **두번째 접근**
  - set의 key 값으로 req.originalUrl을 이용했었는데 유저마다 key 값을 차별화되게 변경 -> 성공 → 데이터가 변해도 변하기 전 데이터 응답 → 실패
- **세번째 접근**
  - set의 key 값에 차별화를 주고, 캐싱된 데이터의 수명을 짧게 해줌 → 실패
- **네번째 접근**
  - 데이터가 변동될 때마다 캐싱 데이터 수정 → 성공 → 데이터의 변동이 있을 때마다 수정을 거듭하다보니 현재 서비스에서 비효율적으로 redis를 사용하게 된다고 판단 → 다른 방법 모색
- **다섯째 접근**

  - 데이터의 변동이 적고, 자주 호출되는 데이터를 타겟으로 캐싱 → 성공

- **실패의 이유**
  > 유저 각각의 key 값에 차별화를 두지 않아 모든 유저가 같은 데이터를 보는 문제가 발생을 했던 것이고, **두번째 접근**에서는 데이터가 변할 때 캐싱된 데이터가 살아있고 캐싱 데이터를 바꿔주지 않아서 생겼던 문제이다. **세번째 접근,네번째 접근**에서는 처음엔 수명을 짧게 해서 캐싱을 자주 하게 했는데 정말 짧으면 캐싱을 하는 이유가 없는거 같다는 생각이 들었고, 어느정도 시간을 주면 두번째 접근에서의 일이 반복되었다. 데이터가 새로 생기거나 수정되고 삭제될때마다 레디스에 접근을 했었는데 이렇게 했을 시 우리의 서비스 대비 레디스에 투자되는 비용이 너무 비효율적으로 높은 것 같다는 생각이 들었다. 그래서 데이터의 변화가 자주 일어나지 않는 곳에 캐싱을 하기로 했다. (**다섯번째 접근**)
  </details>

<details>
  <summary>Time 관련 문제</summary>

- **문제 상황**
  - 시간을 주고 받는데 있어 프론트에서 백으로 왔을 때 서버에 저장되었을 때 시간이 다른 문제
- **첫번째 접근**
  - 프론트에서 시간데이터를 받으면 원하는 시간으로 변경 → 실패(응답속도 불만족)
- **두번째 접근**
  - 백에서 일괄적으로 9시간을 더하거나 빼는 처리작업 → 모든 경우의 수를 해결할 수 없음(실패)
- **세번째 접근**
  - 시간 데이터를 string 값으로 저장했다가 필요시에 변환 → 성공 → 근본적인 해결책이 아님
- **네번째 접근**

  - timezone 설정을 하여 UTC기준으로 저장하고 지역대에 맞게 클라이언트에서 처리 → 성공

- **실패의 이유**
  > 프론트가 쓰는 라이브러리가 설정되어 있는 표준 시간대도 있고 서버도 설정된 표준 시간대가 있었습니다. 세계시와 한국표준시의 9시간의 차이 때문에 처음에는 9시간의 차이를 백에서 직접 입력을 해주고 했지만 캘린더를 쓰기 때문에 이 부분에 있어서 모든 경우의 수를 다 해결할 수 없는 상황이 발생했고, 가공을 어떻게 해도 결국 시간이 달라지는 현상이 발생했습니다. 그래서 UTC 기준으로 저장하고 클라이언트에서 처리를 해서 클라이언트의 시간대를 따라가게 했습니다.
  </details>

<details>
  <summary>소셜로그인 문제</summary>

- **문제 상황**
  - passport를 활용해 소셜로그인 시도→서버에서 보내는 카카오 로그인 정보가 프론트에서 보여지긴 하나, 프론트 에서 데이터에 접근할 수 없는 문제가 발생
- **첫번째 접근**
  - redirectURI와 callbackURL이 서로 다른 것인가 고민해봄
- **두번째 접근**
  - redirectURI와 callbackURL이 같다는 것임을 깨닫고 프론트쪽 URI에도 맞춰보고 백엔드쪽 URI에도 맞춰봄 → 실패
- **세번째 접근**
  - passport전략을 사용하지말고 백엔드에서 axios를 활용해 소셜로그인 방식을 해보자는 의견이 나와 시도함
- **네번째 접근** - axios를 활용해 유저정보를 받아 온 후 소셜로그인에 성공
</details>

![브로셔](https://i.ibb.co/PWXv0t1/2022-12-16-032118.png)
