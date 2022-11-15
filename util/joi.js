const Joi = require('joi');
const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
module.exports = {
    signupSchema : Joi.object({
        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .required()
        .error(new Error('이메일 형식을 확인해주세요')),
        nickname:Joi.string()
        .min(2)
        .max(10)
        .error(new Error('닉네임 형식을 확인해주세요')),
        password:Joi.string()
        .pattern(passwordRegEx)
        .required()
        .error(new Error('비밀번호 형식을 확인해주세요')),
    }),

    loginSchema : Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .required()
        .error(new Error('이메일 형식을 확인해주세요')),
        password : Joi.string()
        .pattern(passwordRegEx)
        .required()
        .error(new Error('비밀번호 형식을 확인해주세요')),
    }),
}