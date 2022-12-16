require('dotenv').config();
const express = require('express');
const app = express();
const port = 4010;
const moment = require('moment');
require('moment-timezone');
const helmet = require('helmet');
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
app.use(cors());
app.use(helmet());
//*morgan 따로 사용시 주석 풀기 (tiny,common,combined,dev) 네종류  // morgan/winston 미들웨어 사용시 주석
// app.use(morgan('dev'));
//*morgan 따로 사용시 밑에 주석 // morgan/winston 미들웨어 사용시 주석풀기
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use('/', routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorLogger);
app.use(errorHandler);

let server;
try {
  const option = {
    ca: fs.readFileSync(process.env.CA_URL),
    key: fs.readFileSync(process.env.KEY_URL),
    cert: fs.readFileSync(process.env.CERT_URL),
  };
  server = HTTPS.createServer(option, app);
  server.listen(port, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}

module.exports = server;
