const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    loadMessage(msg);
});

socket.on('user connected', (userName) => {
    loadUserStatus(userName, true);
});

socket.on('user disconnected', (userName) => {
    loadUserStatus(userName, false);
});

socket.on('chat load', (msgs) => {
    msgs.forEach(msg => loadMessage(msg));
})

loadMessage = (msg) => {
    const item = document.createElement('li');
    const userId = document.getElementById('user_id').value;
    const msgTimestamp = (new Date(msg.createdAt)).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
    });

    console.log(msgTimestamp);

    if(msg.user_id === userId){
        item.classList.add('sent-by-user');
    }

    item.innerHTML = msg.user_name + ' - ' + msgTimestamp + '<br>' + msg.text;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

loadUserStatus = (userName, isConnected) => {
    const statusStr = isConnected ? 'entrou' : 'saiu';
    const item = document.createElement('li');
    item.style.textAlign = 'center';
    item.style.fontStyle = 'italic';
    item.textContent = `${userName} ${statusStr} na conversa`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}