const userService = require('../services/users.service');
const userservice = new userService()
const email = "testyoyoyo@naver.com"
const nickname = "테스트용"
const password = "$2b$12$1lWIpieN0nMO9xtPdMsNXuBS/LKX2trUsVyUS0VlHpYimNHtZ2Gpm"
const avatarImg = "테스트"
const certificationNum = 12345678

const userdata = {
    userId : "1",
    email : "123123@naver.com",
    nickname : "테스트",
    password : "@abcd1234",
    avatarImg : "테스트" 
}

describe("회원가입",()=>{
    test("회원가입 아이디 생성",async()=>{
        userservice.userRepository.createUser = jest.fn(()=>({
            userdata
    }))
        expect(await userservice.createUser({email, nickname, password, avatarImg})).toEqual(
            userdata
        )     
    })

    test("인증코드 일치",async ()=>{
        userservice.userRepository.authEmail = jest.fn(()=>({
            certificationCheck : 1
    }))
        expect(await userservice.authEmail(email)).toEqual({
            result : false,message:"이메일 인증 완료."
        })
    })

    test("인증코드 불일치",async ()=>{
        userservice.userRepository.authEmail = jest.fn(()=>({
            certificationCheck : 0
    }))
        expect(await userservice.certification(email)).toEqual({
            result : false,message:"인증코드가 올바르지 않습니다."
        })
    })

    test("닉네임 변경 닉네임이 일치할경우", async () => {
        const nickname = "테스터"
        userservice.userRepository.changeNic = jest.fn(() => ({
            nickname: "테스터"
        }))
        expect(await userservice.changeNic(nickname)).toEqual({
            nickname: "테스터"
        })
    })

    test("닉네임 변경 닉네임이 일치하지 않을경우", async () => {
        const nickname = "이건없는닉네임인데용"
        userservice.userRepository.changeNic = jest.fn(() => ({
            nickname: "일치하지않아용"
        }))
        expect(await userservice.changeNic(nickname)).toEqual({
            result: false, message:"존재하지 않은 닉네임입니다"
        })
    })
})

describe('유저정보',()=>{
    test('유저 조회',async()=>{
        userservice.userRepository.findByEmail = jest.fn(()=>(
            userdata
        ))
        expect(await userservice.myprofile(email)).toEqual({
            result : true
        })
    })

    test("유저 조회 실패", async () => {
        userservice.userRepository.findByEmail = jest.fn(() => (
            false
        ))
        expect(await userservice.myprofile(email)).toEqual({
            result: false, message: "정보 조회 실패"
        })
    })

    test("로그인 테스트", async () => {
        userservice.userRepository.findByEmail = jest.fn(() => (
            {email: "testyoyoyo@naver.com"}
        ))
        expect(await userservice.userLogin(email)).toEqual({
            result: true 
        })
    })
})