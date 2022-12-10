const { Room, Chat, GroupUser } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class RoomRepository extends Room {
  constructor() {
    super();
  }
  //*roomId 가져오기 room 없으면 생성
  findRoomId = async ({ groupId, sender, receiver }) => {
    const [findRoomId, created] = await Room.findOrCreate({
      where: { groupId: groupId, sender: sender, receiver: receiver },
      dafaults: {
        groupId: groupId,
        sender: sender,
        receiver: receiver,
      },
    });
    return findRoomId;
  };
  //* 그룹유저찾기
  findGroupUser = async ({ groupId, userId }) => {
    const findGroupUser = await GroupUser.findOne({
      where: { [Op.and]: [{ groupId }, { userId }] },
    });
    return findGroupUser;
  };
  //*채팅내용 불러오기
  getChat = async ({ roomId, offset, pageSize }) => {
    const { count, rows } = await Chat.findAndCountAll({
      where: { roomId },
      offset: offset,
      limit: parseInt(pageSize),
      attributes: ['groupUserId', 'message', 'createdAt'],
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    console.log('bugstop::::::::::::::::::::::::::::', rows);
    return rows;
  };
  //*존재하는 룸 찾기
  existRoom = async ({ roomId }) => {
    const existRoom = await Room.findOne({ where: { roomId } });
    return existRoom;
  };

  //*채팅 저장하기
  saveChat = async ({ roomId, groupUserId, message }) => {
    const saveChat = await Chat.create({
      roomId,
      groupUserId,
      message,
      createdAt: moment().subtract(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
    });
    return saveChat;
  };

  //*안읽은 메세지(roomId 조회)
  unreadChat = async ({ sender, receiver }) => {
    const unreadChat = await Room.findOne({
      where: {
        sender,
        receiver,
      },
    });
    return unreadChat;
  };

  //*안읽은 메세지
  countUnread = async ({ roomId, timestamps }) => {
    const countUnread = await Chat.findAll({
      where: {
        roomId,
        createdAt: {
          [Op.gt]: new Date(moment(+timestamps)),
        },
      },
      raw: true,
    });
    console.log('dddddddddddddddddddddddddddddddddddddd', countUnread);
    return countUnread;
  };
  //*본인 groupUser정보
  findUser = async ({ groupId, userId }) => {
    const findUser = await GroupUser.findOne({ where: { groupId, userId } });
    return findUser;
  };
  //*상대유저 groupUserId찾기
  opponentUser = async ({ roomId }) => {
    const opponentUser = await Room.findOne({ where: { roomId } });
    return opponentUser;
  };
  //*상대유저 정보 가져오기
  findUserInfo = async ({ getGroupUserId }) => {
    const findUserInfo = await GroupUser.findOne({
      where: { groupUserId: getGroupUserId },
    });
    return findUserInfo;
  };
}
module.exports = RoomRepository;
