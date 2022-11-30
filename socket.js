const path = require("path")
const server = require("./app")
const socketIo = require("socket.io");
const moment = require("moment");

const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

// app.use(express.static(path.join(__dirname,"src")))

const chatspace = io.of("/chat")

chatspace.on("connection",(socket)=>{
    console.log(socket.id)
    const id = socket.id
    io.emit("broadcast",(socket.id))

    socket.on("joinroom",(chatroom)=>{
        const item ={chatroom,id}
        socket.join(chatroom)
        console.log("chatroom: ", `${chatroom}에 입장.`)
        io.to(chatroom).emit("broadcast2",item)
    })
    
    socket.on("chatting",(data)=>{
        const {chatroom,userId,message} = data
        console.log(data)
        io.to(chatroom).emit("chatting",{
            chatroom,
            userId,
            message,
            time:moment(new Date()).format("h:mm A")
        })
    })
    
    socket.on("disconnect",()=>{
        //데이터 저장
    })
})

    // socket.on('room1',(data)=>{
    //     console.log(data)
    //     io.to('room1').emit('chatting',data)
    // })
