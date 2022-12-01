// require('dotenv').config();
// const redis = require('redis');

// const redisClient = redis.createClient(
//   process.env.REDIS_URL,
//   process.env.REDIS_PORT,
// );

// redisClient.on('error', (err) => {
//   console.error(err);
// });

// redisClient.on('ready', () => {
//   console.log('Redis is Ready');
// });
// // redis에 데이터 저장
// const set = (key, value) => {
//   redisClient.set(key, JSON.stringify(value));
// };

// // 저장 된 데이터를 redis에서 가져오는 미들웨어
// const get = (req, res, next) => {
//   // End-Point의 url을 key로 설정
//   let key = req.originalUrl;

//   redisClient.get(key, (error, data) => {
//     if (error) {
//       res.status(400).send({
//         ok: false,
//         message: error,
//       });
//     }
//     if (data !== null) {
//       // 데이터가 cache되어 있으면, parsing하여 response
//       res.status(200).send({
//         ok: true,
//         data: JSON.parse(data),
//       });
//     } else next();
//   });
// };

// module.exports = {
//   set,
//   get,
// };
