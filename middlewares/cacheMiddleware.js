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
// const redisPut = async (key, values, expire) => {
//   try {
//     await redisClient.rename(key, values, 'EX', expire);
//     return;
//   } catch (error) {
//     console.log('redisPut', error);
//     return;
//   }
// };

// const groupListGet = async (req, res, next) => {
//   const { userId } = res.locals.user;
//   let key = `userId:${userId}:GroupList`;

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
//   });
// };
// const groupUserListGet = async (req, res, next) => {
//   const { userId } = res.locals.user;
//   const { groupId } = req.params;
//   let key = `userId:${userId}:groupId:${groupId}GroupUserList`;

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
//   });
// };

// module.exports = { redisSet, redisPut, groupListGet, groupUserListGet };
