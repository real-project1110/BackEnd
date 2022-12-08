// const redis = require('redis');
// require('dotenv').config();

// const redisClient = redis.createClient({
//   host: process.env.REDIS_URL,
//   port: process.env.REDIS_PORT,
//   legacyMode: true,
// });

// redisClient.connect().catch(console.error);
// redisClient.on('error', (err) => {
//   console.error(err);
// });
// // redisClient.get = util.promisify(redisClient.get).bind(client);
// // redisClient.set = util.promisify(redisClient.set).bind(client);
// redisClient.on('ready', () => {
//   console.log('Redis is Ready');
// });

// const redisSet = async (key, values, expire) => {
//   try {
//     await redisClient.set(key, values, 'EX', expire);
//     return;
//   } catch (error) {
//     console.log('redisSet', error);
//     return;
//   }
// };

// const redisGet = async (req, res, next) => {
//   let key = req.originalUrl;

//   await redisClient.get(key, async (error, data) => {
//     try {
//       if (data === null) {
//         next();
//       } else {
//         console.log('data존재한다고합니다.', data);
//         return res.status(200).json({ ok: true, data: JSON.parse(data) });
//       }
//     } catch (error) {
//       next();
//     }
//     // if (error) {
//     //   res.status(400).send({
//     //     ok: false,
//     //     message: error,
//     //   });
//     // }
//     // if (data !== null) {
//     //   res.status(200).send({
//     //     ok: true,
//     //     data: JSON.parse(data),
//     //   });
//     // } else next();
//   });
// };
// module.exports = { redisSet, redisGet };
