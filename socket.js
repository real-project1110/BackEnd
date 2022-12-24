const socketIo = require('socket.io');
const { User, Room } = require('./models');

const onlineMap = {};
const roomMap = {};
const roomMember = {};
const onlineUser = {};
//*{socket.id : userId}

module.exports = (server) => {
  const io = socketIo(server, { path: '/socket.io' });
  //   const socketIdMap = {};

  //   function emitSamePageViewerCount() {
  //     const countByUrl = Object.values(socketIdMap).reduce((value, url) => {
  //       return {
  //         ...value,
  //         [url]: value[url] ? value[url] + 1 : 1,
  //       };
  //     }, {});

  //     for (const [socketId, url] of Object.entries(socketIdMap)) {
  //       const count = countByUrl[url];
  //       io.to(socketId).emit('SAME_PAGE_VIEWER_COUNT', count);
  //     }
  //   }

  //   io.on('connection', (socket) => {
  //     const req = socket.request;
  //     socketIdMap[socket.id] = null;

  //     socket.on('CHANGE_PAGE', (data) => {
  //       socketIdMap[socket.id] = data;
  //       emitSamePageViewerCount();
  //     });
  //     const { watchByeBye } = inintSocket(socket);
  //     watchByeBye();
  //   });

  //   function initSocket(socket) {
  //     console.log('new user');
  //     function watchEvent(event, func) {
  //       socket.on(event, func);
  //     }
  //     function notifyEveryone(event, func) {
  //       io.emit(event, func);
  //     }
  //     return {
  //       watchByeBye: () => {
  //         watchEvent('disconnect', () => {
  //           delete socketIdMap[socket.id];
  //           console.log(sock.id, '연결이 끊어졌어요!');
  //           emitSamePageViewerCount();
  //         });
  //       },
  //     };
  //   }
  // };

  //   //*{키:밸,키:밸,키:밸}
  //   //*onlineUser[socket.id] = email로 조회한 userId => {asdfhoiuas : 3, asfdasdf : 5}
  //   //*위와 같은 형식으로 하면 socket.id로 보내주기가 가능
  // io.of('/allUsers').on('connection', (socket) => {
  //   socket.on('login', (data) => {
  //     onlineUser[socket.id] = data.userId;
  //     console.log('onlineUser::::::::::::::::::::', onlineUser);
  //   });
  // socket.on('error', (error) => {
  //   console.error(error);
  // });
  //   socket.on('invite', async (data) => {
  //     const { inviteEmails } = data;
  //     const findUsers = [];
  //     for (let i = 0; i < inviteEmails.length; i++) {
  //       const findUser = await User.findOne({
  //         where: { email: inviteEmails[i] },
  //         raw: true,
  //       });
  //       findUsers.push(findUser.userId);
  //     }
  //     const findSocektId = Object.entries(onlineUser).filter((a) =>
  //       findUsers.includes(a[1]),
  //     );
  //     console.log('invite:::::::::::::::::findSocketId', findSocektId);
  //     for (let i = 0; i < findSocektId.length; i++) {
  //       io.to(findSocektId[i]).emit('invite');
  //     }
  //   });
  // });

  const Nsp = io.of(/^\/statUS-\d+$/).on('connection', (socket) => {
    const newNamespace = socket.nsp;
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    socket.on('joinGroup', (data) => {
      onlineMap[socket.nsp.name][socket.id] = data.groupUserId;
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name]),
      );
      // newNamespace.emit('notReadMsg', onlineMap[socket.nsp.name].length);
    });
    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('disconnect', () => {
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name]),
      );
    });

    socket.on('joinRoom', async (data) => {
      socket.join(data.roomId);
      const findRoom = await Room.findOne({
        where: { roomId: data.roomId },
        raw: true,
      });
      roomMember[data.roomId] = [findRoom.sender, findRoom.receiver];
      if (!roomMap[data.roomId]) {
        roomMap[data.roomId] = [];
      }
      roomMap[data.roomId].push(data.groupUserId);
      roomMap[data.roomId] = roomMap[data.roomId].filter(
        (a) => a !== undefined,
      );
      roomMap[data.roomId] = roomMap[data.roomId].filter(
        (a, i) => roomMap[data.roomId].indexOf(a) === i,
      );
    });
    socket.on('leaveRoom', (data) => {
      socket.leave(data.roomId);
      if (roomMap[data.roomId]) {
        if (roomMap[data.roomId].length) {
          roomMap[data.roomId] = roomMap[data.roomId].filter(
            (a) => a !== data.groupUserId,
          );
        }
      }
    });
    socket.on('message', (data) => {
      const { message, roomId, groupUserId, createdAt } = data;
      const msg = { message, groupUserId, createdAt };
      newNamespace.to(roomId).emit('message', msg);

      const groupUsers = onlineMap[socket.nsp.name];
      if (roomMap[roomId].length === 1) {
        const unreadUserId = roomMember[roomId].filter(
          (a) => a !== roomMap[roomId][0],
        );
        const targetId = Object.entries(groupUsers).filter(
          (a) => a[1] === unreadUserId[0],
        );
        newNamespace.to(targetId[0][0]).emit('unread', groupUserId);
      }
    });
  });
};
