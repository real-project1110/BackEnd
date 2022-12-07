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
      console.log(
        'roomMap[data.roomId]::::::::::::::::::::::::::',
        roomMap[data.roomId],
        data.groupUserId,
      );
    });
    socket.on('leaveRoom', (data) => {
      socket.leave(data.roomId);
      roomMap[data.roomId] = roomMap[data.roomId].filter(
        (a) => a !== data.groupUserId,
      );
      console.log(
        'LEAVEROOM---roomMap[data.roomId]::::::::::::::::::::::::::',
        roomMap[data.roomId],
      );
    });
    socket.on('message', (data) => {
      const { message, roomId, groupUserId, createdAt } = data;
      const msg = { message, groupUserId, createdAt };
      newNamespace.to(roomId).emit('message', msg);
      console.log(
        'MESSAGE----roomMap[data.roomId]::::::::::::::::::::::::::',
        roomMap[data.roomId],
      );
      console.log(
        'roomMap.length::::::::::::::::::::::::',
        roomMap,
        roomMap[roomId].length,
      );
      //* roomMap = room에 조인여부
      //* roomMember = room에 있는 유저
      //* groupUsers = 그룹내에 있는 모든 유저 = socket.id 를 구하기 위해서 해줌
      //* unreadUserId = 나간유저 = roomMember - roomMap
      const groupUsers = onlineMap[socket.nsp.name];
      // {5:[4,5]}
      console.log(
        'roomMap,roomMember::::::::::::::::::::::::::::::::::::::::::',
        roomMap,
        roomMember,
      );
      console.log('groupUsers:::::::::::::::::::::::::::::', groupUsers);
      if (roomMap[roomId].length === 1) {
        const unreadUserId = roomMember[roomId].filter(
          (a) => a !== roomMap[roomId][0],
        );
        console.log(
          'unreadUser::::::::::::::::::::::::::::::::::::::::::::::::::',
          unreadUserId,
        );
        const targetId = Object.entries(groupUsers).filter(
          (a) => a[1] === unreadUserId[0],
        );
        console.log(
          'targetId:::::::::::::::::::::::::::::::::::::::::::::::::::',
          targetId,
        );
        console.log(
          'targetId[0]::::::::::::::::::::::::::::::::::::::::',
          targetId[0],
        );
        newNamespace.to(targetId[0]).emit('unread', groupUserId);
      }
    });
  });
};
//   );
// };
//* {1:[] , 2:[]}
// io.on('connection', (socket) => {
//     const req = socket.request;
//     console.log('연결완료');

//     socket.on('disconnect', () => {
//       clearInterval(socket.interval);
//     });

//     socket.on('error', (error) => {
//       console.error(error);
//     });

//     let newRoom = io.of('');
//     socket.on('joinRoom', (data) => {
//       socket.join(data.roomId);
//       console.log('조인확인', data);
//     });

//     socket.on('leaveRoom', (roomId) => {
//       socket.leave(roomId);
//     });

//     socket.on('message', (data) => {
//       const { message, roomId, groupUserId, createdAt } = data;
//       console.log('채팅 확인', data);
//       const msg = { message, groupUserId, createdAt };
//       io.to(roomId).emit('message', msg);
//     });
//   });
// };
