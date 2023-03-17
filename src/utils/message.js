const generateMessage=(username,text)=>
{
    return {
        username,
        text,
        creatAt:new Date().getTime()
    }
}

//generateLocationMessage
const generateLocationMessage=(username,url)=>
{
    return {
        username,
        url,
        creatAt:new Date().getTime()
    }
}

module.exports={
    generateMessage,
    generateLocationMessage
}