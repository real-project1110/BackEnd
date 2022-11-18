const express = require('express');
const app = express();
const port = 4000;
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
// //*fs and https 모듈 가져오기
// const https = require('https');
// const fs = require('fs');

// //* ccertificate와 private key 가져오기
// const options = {
//   // ca: fs.readFileSync('./ca.key'),
//   key: fs.readFileSync('./cert.key'),
//   cert: fs.readFileSync('./cert.crt'),
// };
const cors = require('cors');
const {
  errorLogger,
  errorHandler,
} = require('./middlewares/error-handler.middleware');
const routes = require('./routes');
const session = require('cookie-session');
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();
const morganMiddleware = require('./middlewares/morganMiddleware');

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: [process.env.KAKAO_SECRET,process.env.GOOGLE_SECRET],
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
//*morgan 따로 사용시 주석 풀기 (tiny,common,combined,dev) 네종류  // morgan/winston 미들웨어 사용시 주석
// app.use(morgan('dev'));
//*morgan 따로 사용시 밑에 주석 // morgan/winston 미들웨어 사용시 주석풀기
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger);
app.use(errorHandler);
// https
//   .createServer(
//     {
//       key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
//       cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
//     },
//     function (req, res) {
//       res.write('Congrats! You made https server now :)');
//       res.end();
//     },
//   )
//   .listen(4000);
app.listen(port, () => {
  console.log('Hi server open :', port);
});
// //*https 오픈
// https.createServer(options, app).listen(port, () => {
//   console.log(`HTTPS server started on port 4000`);
// });
