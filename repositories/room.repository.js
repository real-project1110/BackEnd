const { Room, Chat, GroupUser } = require('../models');
const { Op } = require('sequelize');
const Sq = require('sequelize');
const Sequelize = Sq.Sequelize;

class RoomRepository extends Room {
  constructor() {
    super();
  }
  //*roomId 가져오기 room 없으면 생성
  findRoomId = async ({ groupId, users }) => {
    const [findRoomId, created] = await Room.findOrCreate({
      where: { groupId: groupId, users: users },
      dafaults: {
        groupId: groupId,
        users: users,
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
      order: [['createdAt', 'ASC']],
      raw: true,
    });
    return rows;
  };
  //*존재하는 룸 찾기
  existRoom = async ({ roomId }) => {
    const existRoom = await Room.findOne({ where: { roomId } });
    return existRoom;
  };

  //*채팅 저장하기
  saveChat = async ({ roomId, groupUserId, message }) => {
    const saveChat = await Chat.create({ roomId, groupUserId, message });
    return saveChat;
  };
}
module.exports = RoomRepository;
