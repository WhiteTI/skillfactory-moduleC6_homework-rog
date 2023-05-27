const input = document.querySelector('input');
const button = document.querySelector('button');
const buttonGeo = document.querySelector('.geo');
const messageDisplay = document.querySelector('.message-display');

const urlEcho = 'wss://ws.postman-echo.com/raw';

let websocket = new WebSocket(urlEcho);
websocket.onopen = (event) => console.log('open');


function writeToScreen(message, orient, teg, href = '') {
    let pre = document.createElement(teg);

    if (teg == 'a') {
        pre.href = href;
    }

    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    pre.classList.add(orient, 'message');
    messageDisplay.appendChild(pre);
}

button.addEventListener('click', (event) => {
    event.preventDefault();

    let message = input.value;
    input.value = '';

    writeToScreen(message, 'left', 'p');
    websocket.send(message);
    
    websocket.onmessage = function(event) {
        writeToScreen(event.data, 'right', 'p');
    };
});

buttonGeo.addEventListener('click', (event) => {
    event.preventDefault();

    if (!navigator.geolocation) {
       console.log('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success);
    }
});

const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    let href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    let message = input.value;
    input.value = '';
    websocket.send(message);
    
    writeToScreen('Геолокация', 'left', 'a', href);
};