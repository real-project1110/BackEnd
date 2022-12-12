require('dotenv').config();
const express = require('express');
const app1 = express();
const app2 = express();
const app3 = express();
const port1 = 4010;
const port2 = 4020;
const port3 = 4030;
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const expressSanitizer = require('express-sanitizer');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const HTTPS = require('https');
const swaggerFile = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');
const socket = require('./socket');

// //*fs and https 모듈 가져오기
// const https = require('https');
// const fs = require('fs');

const cors = require('cors');
const {
  errorLogger,
  errorHandler,
} = require('./middlewares/error-handler.middleware');
const routes = require('./routes');
const session = require('cookie-session');
// const passport = require('passport');
// const passportConfig = require('./passport');
// passportConfig();
const morganMiddleware = require('./middlewares/morganMiddleware');

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: [
//       process.env.KAKAO_SECRET,
//       process.env.GOOGLE_SECRET,
//       process.env.NAVER_SECRET,
//     ],
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
app1.use(cors());
app2.use(cors());
app3.use(cors());
//*morgan 따로 사용시 주석 풀기 (tiny,common,combined,dev) 네종류  // morgan/winston 미들웨어 사용시 주석
// app.use(morgan('dev'));
//*morgan 따로 사용시 밑에 주석 // morgan/winston 미들웨어 사용시 주석풀기
app1.use(morganMiddleware);
app2.use(morganMiddleware);
app3.use(morganMiddleware);
app1.use(express.json());
app2.use(express.json());
app3.use(express.json());
app1.use(express.urlencoded({ extended: false }));
app2.use(express.urlencoded({ extended: false }));
app3.use(express.urlencoded({ extended: false }));
app1.use(expressSanitizer());
app2.use(expressSanitizer());
app3.use(expressSanitizer());
app1.use(cookieParser());
app2.use(cookieParser());
app3.use(cookieParser());
app1.use('/', routes(1));
app2.use('/', routes(2));
app3.use('/', routes(3));
app1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app2.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app3.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app1.use(errorLogger);
app2.use(errorLogger);
app3.use(errorLogger);
app1.use(errorHandler);
app2.use(errorHandler);
app3.use(errorHandler);

let server;
try {
  const option = {
    ca: fs.readFileSync(process.env.CA_URL),
    key: fs.readFileSync(process.env.KEY_URL),
    cert: fs.readFileSync(process.env.CERT_URL),
  };
  server = HTTPS.createServer(option, app1);
  server.listen(port1, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port1);
    socket(server);
  });
  server = HTTPS.createServer(option, app2);
  server.listen(port2, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port2);
  });
  server = HTTPS.createServer(option, app3);
  server.listen(port3, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port3);
  });
} catch (error) {
  app1.listen(port1, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port1);
  });
  app2.listen(port2, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port2);
  });
  app3.listen(port3, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port3);
  });
}

module.exports = server;
