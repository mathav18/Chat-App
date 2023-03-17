const express=require('express');
const path=require('path')
const socketio=require('socket.io')
const http=require('http')
const app=express();
const server=http.createServer(app)
const io=socketio(server);
const Filter=require('bad-words');
const {generateMessage,generateLocationMessage}=require('./utils/message');
const {adduser,removeUser,getUser,getUserRoom}=require('./utils/user')

const port=process.env.PORT || 2000;
const publicDirectoryPath=path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));


io.on('connection',(socket)=>{
 

socket.on('join',({username,room},callback)=>{
    const {error,user}=adduser({id:socket.id,username,room})

    if(error){
        callback(error)
    }

    socket.join(room)
    socket.emit('message',generateMessage('Admin','welcome!'));

    socket.broadcast.to(room).emit('message',generateMessage('Admin',`${username} has Joined`))
    io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUserRoom(user.room)
    })

    callback()
})


socket.on('sendMessage',(message,callback)=>{
          const user=getUser(socket.id)
          let text=message;
          const filter=new Filter();

        if(filter.isProfane(message)){
            return ("profanity is not allowed")
        }
        io.to(user.room).emit('message',generateMessage(user.username,text))
        callback()
    })

    

    socket.on('sendLocation',(coords,callback)=>{
        const user=getUser(socket.id);
        let url=`https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,url))
        callback();
    })

socket.on('disconnect',()=>{
        const user=removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message',generateMessage('Admin ',`${user.username} has  left!`))
            
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUserRoom(user.room)
             })
            }
         })
        })


server.listen(port,'172.17.53.207',()=>{
    console.log(`server is up on port ${port}`)
})
