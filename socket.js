const socketIo = require('socket.io');

const onlineMap = {};
const roomMap = {};

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
  //* {보낸사람 , 메세지갯수}
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
      newNamespace.emit('notReadMsg', onlineMap[socket.nsp.name].length);
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
    socket.on('joinRoom', (data) => {
      socket.join(data.roomId);
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
        (a) => a == data.groupUserId,
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
      const unreadUserId = roomMap[roomId][0];
      const groupUsers = onlineMap[socket.nsp.name];
      console.log(
        'unreadUserId:::::::::::::::::::::::::::::::::',
        unreadUserId,
      );
      console.log(
        'onlineMap::::::::::::::::::::::::::::::::::::::',
        onlineMap[socket.nsp.name],
      );
      if (roomMap[roomId].length === 1) {
        const targetId = Object.entries(groupUsers).filter(
          (a) => a[1] === unreadUserId,
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
