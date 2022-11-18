require('dotenv').config();
const passport = require('passport');
const kakao = require('./kakao');
const google = require('./google');
// const naver = require('./naver');

module.exports = ()=>{
    passport.serializeUser((user,done)=>{
        done(null,user);
    });
    passport.deserializeUser((user,done)=>{
        done(null, user);
    });

    kakao();
    google();
    // naver();
}