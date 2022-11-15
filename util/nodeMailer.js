const nodemailer = require('nodemailer');
const {Certification} = require('../models');

const authEmail = (email)=>{

    const certificationNum = Math.floor(Math.random()*100000000);
    const configOptions = {
        service : process.env.NODEMAILER_SERVICE,
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        maxConnections : 50,
        auth : {
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASSWORD,
        },
    };

    const emailForm = {
        from: process.env.NODEMAILER_EMAIL,
        to : email,
        subject : "statUS 이메일 인증요청입니다",
        html : `<p>인증번호는 ${certificationNum}입니다.</p>`
    }
    const transporter = nodemailer.createTransport(configOptions);
    transporter.sendMail(emailForm);
    Certification.create({email,certificationNum})
}
module.exports = authEmail