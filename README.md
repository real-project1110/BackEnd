## ✨ statUs
![statUs_main](https://www.notion.so/statUs-d2e9ed521e204b79ab20263e8823e744#7aded78315544a7990b520d559996842)

## 👉🏻 프로젝트 소개 <br>
- 팀원의 실시간 상태를 확인하고 싶을때
- 팀원의 일정을 한눈에 확인하고 싶을때
- 팀 프로젝트의 일정을 한눈에 확인하고 싶을때

✨ statUs는 원활한 팀 업무와 팀 내 커뮤니케이션을 도와주는 서비스입니다 🥳

👉🏻[statUs 이용해보기 Click!](https://www.status.gift/) <br>
👉🏻[statUs 팀 노션 Click!](https://www.notion.so/statUs-d2e9ed521e204b79ab20263e8823e744)

<br>

## 🛠 프로젝트 아키텍쳐
![real_project](https://user-images.githubusercontent.com/113870221/206828371-2234b618-f39e-4309-9bc3-acb29cb6a19d.png)


<br>


## ⚙ 기술 스택

### ✔ Frond-end
<div>
</div>


### ✔ Back-end
<div>
</div>




## 📝 기술 스택 & 라이브러리 사용 이유



<br>

## 💡 주요 기능
1. 무한 스크롤 ♾
2. 실시간 채팅 💬



<br>

## 🔆 트러블슈팅
<details>
<summary> 1. Lambda Access denied </summary>
<div markdown="1">

  <br>

‼️ **문제 상황**  : S3 버켓에 이미지가 올라가지만 lambda 트리거가 작동을 하지 않고 access denied 403 에러를 띄우는 문제

  <br>
  
1️⃣ **해결방안 1안** : access denied가 뜨므로 권한에서 문제가 있는 것으로 판단하고 IAM 권한쪽으로 수정하고 다시시도 → 실패(access denied 403) → 다시 처음부터 AWS 세팅 → 실패(access denied 403)

2️⃣ **해결방안 2안** : AWS의 세팅에 문제가 없으면 lambda에 문제가 있을 것이라 판단하고 함수와 트리거 수정하고 다시시도 → 실패(access denied 403) → lambda와 s3를 다시 만들며 진행 → 실패(access denied 403)

3️⃣ **해결방안 3안** : lambda와 권한을 건드려봤으나 해결이 되지 않아 multerMiddleware 코드 다시작성 시도 → 실패(access denied 403) → multer 세팅을 바꾸며 다시시도 → 이름을 현재날짜로만 바꿔줬을 때 성공

<br>
  
</div>
</details>


 
## 👻 statUs 팀원들!

|Role|Name|Github|
|---|---|---|
|FE*팀장|한세준|---|
|FE|안치영|---|
|BE*부팀장|김정현|---|
|BE|정현진|---|
|BE|유동희|---|
|UX/UI|문예진|---|
