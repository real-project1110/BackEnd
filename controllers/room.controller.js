const RoomService = require('../services/room.service');
const InvalidParamsError = require('../exceptions/index.exception');

class RoomController {
  roomService = new RoomService();
  //*roomId get요청
  findRoomId = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { sender, receiver } = req.query;
      const { userId } = res.locals.user;
      if (!groupId || !sender || !receiver) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findRoomId = await this.roomService.findRoomId({
        groupId,
        sender,
        receiver,
        userId,
      });
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
      res.status(200).json({ ok: true, data: getChat });
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
  unreadChat = async (req, res, next) => {
    try {
      const { sender, receiver, timestamps } = req.query;
      if (!sender || !receiver || !timestamps) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const unreadChat = await this.roomService.unreadChat({
        sender,
        receiver,
        timestamps,
      });
      res.status(200).jsonn({ ok: true, data: unreadChat });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = RoomController;
