const socketIo = require('socket.io');

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
  io.on('connection', (socket) => {
    const req = socket.request;

    socket.on('disconnect', () => {
      clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('joinRoom', (data) => {
      socket.join(data.roomId);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
    });

    socket.on('sendChat', (data) => {
      const { message, roomId, groupUserId } = data;
      io.to(roomId).emit('message', message);
    });
  });
};
