alert('(☞ﾟヮﾟ)☞  Вітаю ! Ви у чаті  ☜(ﾟヮﾟ☜)');
const socket = io({
    auth: {
        cookie: document.cookie
    }
})

let form = document.getElementById('form');
let input = document.getElementById("input");

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }

})

let chat_body = document.getElementById('chat_body');

socket.on('message', function(msg){
    let item = document.createElement('div');
    item.classList.add("chat_body_item");
    item.textContent = msg;

    chat_body.appendChild(item);

    chat_body.scrollTo(0, chat_body.scrollHeight);
});


function changeNickname(){
    let nickname = prompt('Choose your nickname');
    if(nickname){
        socket.emit('set_nickname', nickname);
    }
}

// changeNickname();



socket.on('all_messages', function(msgArray){
    msgArray.forEach(msg => {
        let item = document.createElement('div');
        item.classList.add("chat_body_item");
        item.textContent = msg.login + ": " + msg.content;
        
        chat_body.appendChild(item);
        chat_body.scrollTo(0, chat_body.scrollHeight);
    });
});