const server = require('./app');
const app = express();
const fs = require('fs');
const HTTPS = require('https');
const port = 4010;
let service;
const option = {
  ca: fs.readFileSync(process.env.CA_URL),
  key: fs.readFileSync(process.env.KEY_URL),
  cert: fs.readFileSync(process.env.CERT_URL),
};
server = HTTPS.createServer(option, app);
server.listen(port, () => {
  console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
});
