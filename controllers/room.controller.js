const RoomService = require('../services/room.service');
const InvalidParamsError = require('../exceptions/index.exception');
const moment = require('moment');
const { redisSet, redisGet } = require('../middlewares/cacheMiddleware');
// const { invalidParameterError } = require('sharp/lib/is');

require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

class RoomController {
  roomService = new RoomService();
  //*roomId get요청
  findRoomId = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { sender, receiver } = req.query;
      const { userId } = res.locals.user;
      const getData = redisGet(
        `groupId:${groupId}:sender:${sender}:receiver:${receiver}`,
      );
      if (getData) {
        return res.staus(200).json({ ok: true, data: getData });
      }
      if (!groupId || !sender || !receiver) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findRoomId = await this.roomService.findRoomId({
        groupId,
        sender,
        receiver,
        userId,
      });
      await redisSet(
        `groupId:${groupId}:sender:${sender}:receiver:${receiver}`,
        findRoomId,
        180,
      );
      res.status(200).json({ ok: true, data: findRoomId });
    } catch (error) {
      next(error);
    }
  };
  //*채팅내역 불러오기
  getChat = async (req, res, next) => {
    try {
      //const { userId } = res.locals.user;
      const { roomId } = req.params;
      const { page, pageSize } = req.query;
      const getChat = await this.roomService.getChat({
        roomId,
        page,
        pageSize,
      });
      res.status(200).json({ ok: true, getChat });
    } catch (error) {
      next(error);
    }
  };
  //*채팅 내용 저장하기
  saveChat = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const { groupUserId, message } = req.body;
      if (!roomId || !groupUserId || !message) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const saveChat = await this.roomService.saveChat({
        roomId,
        groupUserId,
        message,
      });
      res.status(201).json({ ok: true });
    } catch (error) {
      next(error);
    }
  };
  //*안읽은 메세지
  unreadChat = async (req, res, next) => {
    try {
      const { sender, receiver, timestamps } = req.query;
      if (!sender || !receiver || !timestamps) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      console.log('받은 timestapms:::::::::::::::::::', timestamps);
      console.log(
        '현재시간이 되어야 합니다.:::::::::::::::::::::::::',
        moment(+timestamps).format('YYYY-MM-DD HH:mm:ss'),
      );
      const unreadChat = await this.roomService.unreadChat({
        sender,
        receiver,
        timestamps,
      });
      console.log('불러온채팅입니다:::::::::::::::::', unreadChat);
      res.status(200).json({ ok: true, data: unreadChat });
    } catch (error) {
      next(error);
    }
  };
  //*상대 유저 정보 보내주기(groupUserId,img(ori포함),nick)
  findChatUser = async (req, res, next) => {
    try {
      const { groupId, roomId } = req.params;
      const { userId } = res.locals.user;
      // const getData = redisGet(`groupId:${groupId}:roomId:${roomId}`);
      // if (getData) {
      //   return res.staus(200).json({ ok: true, data: getData });
      // }
      if (!groupId || !roomId || !userId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findChatUser = await this.roomService.findChatUser({
        groupId,
        roomId,
        userId,
      });
      // await redisSet(`groupId:${groupId}:roomId:${roomId}`, findChatUser, 60);
      res.status(200).json({ ok: true, data: findChatUser });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = RoomController;
