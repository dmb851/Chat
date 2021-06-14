var socket=io();
var form = document.getElementById('inputForm');
var nameForm = document.getElementById('nameForm');
var input = document.getElementById('input');
var nameInput = document.getElementById('inputName');
var messages = document.getElementById('messages');

class User{
    constructor(name = "anonymous"){
        this.name = name;
    };
};
var myUser = new User();
if(nameForm){
    nameForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (nameInput.value) {
            myUser.name = nameInput.value;
        }
    });
}

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value) {
            console.log("hi");
            createHTMLMessage(myUser.name, input.value);
            socket.emit('chat message',  {name: myUser.name, msg: input.value});
            input.value = '';
        }
    });
};

socket.on('chat message', function(msg){
    createHTMLMessage(msg.name, msg.msg);
    window.scrollTo(0, document.body.scrollHeight);
});


function createHTMLMessage(name, message){
    var item = document.createElement('li');
    item.textContent = name + ": " + message;
    messages.appendChild(item);
}
