require('dotenv').config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

// 구글 로그인
module.exports = () => {
    passport.use(
        new googleStrategy(
            {   
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: 'google' },
                    });
                    console.log(profile._json)
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json.email,
                            nickname : profile._json.name,
                            snsId: profile.id,
                            provider: 'google',
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};