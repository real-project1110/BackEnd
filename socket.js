// const path = require("path")
// const server = require("./app")
// const moment = require("moment");
// const {ChattingList} = require('./models')
// const socketIo = require("socket.io");
// const io =new socketIo(server, {
//   pingInterval: 10000,
//   pingTimeout: 5000,
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       credentials: true,
//       transports: ["websocket"],
//     },
//   });

// // app.use(express.static(path.join(__dirname,"src")))

// const chatspace = io.of("/chat")

// io.on("connection",(socket)=>{
//     console.log(socket.id)
//     const id = socket.id
//     io.emit("broadcast",(socket.id))

//     socket.on("joinroom",(roomId)=>{
//         const item ={roomId,id}
//         socket.join(roomId)
//         console.log("roomId: ", `${roomId}에 입장.`)
//         io.to(roomId).emit("broadcast2",item)
//     })
    
//     socket.on("chatting",async(data)=>{
//         const {roomId,userId,message} = data
//         // const chattingList = new ChattingList()
//         // console.log(chattingList)
//         // await chattingList.create({roomId,userId,message})
//         console.log(data)
//         io.to(roomId).emit("chatting",{
//             roomId,
//             userId,
//             message,
//             time:moment(new Date()).format("h:mm A")
//         })
//     })
    
//     // socket.on("disconnect",()=>{
//         //데이터 저장
//     // })
// })

//     // socket.on('room1',(data)=>{
//     //     console.log(data)
//     //     io.to('room1').emit('chatting',data)
//     // })

//     module.exports = socketIo