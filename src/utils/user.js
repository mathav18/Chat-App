const users=[];


const adduser=({id,username,room})=>{
    username=username.trim().toLowerCase();
    room=room.trim().toLowerCase();

    if(!username||!room){
        return{
           errror:'UserName and room are required'
        }
    }


    const existinUser=users.find((user)=>{
        return user.room===room && user.username=== username
    })

    if(existinUser){
        return{
            error:'username is in use!'
        }
    }

    const user = {id,username,room}
    users.push(user)
    return { user }
}

const removeUser=(id)=>{
    const index=users.findIndex((user)=> user.id===id)

    if(index!==-1){
         return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    return users.find((user)=>user.id===id)
}


const getUserRoom=(room)=>{
    room=room.trim().toLowerCase();
    return users.filter((user)=>user.room===room )
}

module.exports={
    adduser,
    removeUser,
    getUser,
    getUserRoom
}