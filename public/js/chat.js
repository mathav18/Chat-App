


const socket=io("http://172.17.53.207:2000/");
socket.emit("hello from clint",5,"6",{7: Uint8Array.from([8])});

socket.on("hello from server",(...args)=>{
    console.log("hello from server",...args);
});


const sendMessageForm=document.querySelector("#message_form");
const sendMessageInput=sendMessageForm.querySelector("input");
const sendMessageButton=sendMessageForm.querySelector("button");
const sendLocationButton=document.querySelector('#send_Location');
const message_div=document.querySelector("#message");

const messageTemplates=document.querySelector("#message_template").innerHTML;
const LocationMessageTemplate=document.querySelector("#location_message_template").innerHTML;
const sidebartemplate=document.querySelector("#sidebar-template").innerHTML;

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});

//Auto Scrooll
const autoscroll = ()=>{
     const $newMessage = message_div.lastElementChild;
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;
    const visibleHeight = message_div.offsetHeight;
    const containerHeight = message_div.scrollHeight;
    const scrollOffset = message_div.scrollTop+visibleHeight;
    if(containerHeight - newMessageHeight<=scrollOffset){
        message_div.scrollTop = message_div.scrollHeight;
    }
}

//message Template
socket.on('message',(text)=>{
    console.log(text)
    const html =Mustache.render(messageTemplates,{
        username:text.username,
       message:text.text,
       creatAt:moment(message.creatAt).format('ddd h:m A')
    });
    message_div.insertAdjacentHTML("beforeend",html)
    autoscroll();
})

//location template
socket.on('locationMessage',(url)=>{
    console.log("url")
    const html =Mustache.render(LocationMessageTemplate,{
        username:url.username,
        url:url.url,
        creatAt:moment(message.creatAt).format('h:m A')
     });
     message_div.insertAdjacentHTML("beforeend",html)
     autoscroll();
})
//user join and left list
socket.on('roomData',({room,users})=>{
    console.log(room)
const html=Mustache.render(sidebartemplate,{
   room,
   users
    })

    document.querySelector('#sidebar').innerHTML=html
})


sendMessageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    sendMessageButton.setAttribute('disabled','disabled')
    const message=e.target.elements.message.value
    socket.emit('sendMessage',message,(error)=>{
        sendMessageButton.removeAttribute('disabled');
        sendMessageInput.value='';
        sendMessageInput.focus();
        if(error){
            return console.log(error)
        }
       console.log("message Delevired")
       hideEmojiDiv();
    })
})






//send Image Function


function sendEmoji(){
    
    let parent=document.querySelector(".EmojoParent").style.display="block";
emojiCreate();


}

function hideEmojiDiv(){
    let parent=document.querySelector(".EmojoParent").style.display="none";
}


function emojiCreate(){
    let parent=document.querySelector(".EmojoParent")
    let emojiArr=['😀','😁','😆','😅','🤣','😂','🙂','🙃','🫠','😉','😊','😇','🥰','😍','🤩','😘','😚','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🫢','🫣','🤫','🤔','🫡']
    for(let i of emojiArr){
        parent.innerHTML+=`<div id="emojiDiv" onclick="addEmoji(this)">${i}</div>`
    }
}

function addEmoji(ele){
 
    sendMessageInput.value+=ele.innerText
    
}











socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/'
     }
})