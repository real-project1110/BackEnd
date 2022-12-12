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

- 그룹,스케쥴,컬러,초대,게시판,댓글,룸,채팅,이미지 기능구현
- redis 데이터 캐싱
- lambda 이미지 리사이징
- socket.io : 실시간 채팅 / 안읽은 메시지 알림 / 실시간 접속 유저 표시
- CICD
- swagger
- morgan/winton 에러로그 저장
- 부하테스트
- test
- nginx(https , Load Balancer)

👷🏻‍♂️ 정현진

- 로그인, 회원가입, 유저, 그룹내 유저, 게시글/댓글 좋아요 기능구현
- 소셜로그인
- nodemailer
- 로그인 미들웨어
- jwt

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
