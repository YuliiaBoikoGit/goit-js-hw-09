const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;

stopButton.disabled = true;
startButton.classList.toggle('btnActive');

startButton.addEventListener("click", () => {
    timerId = setInterval(() => onChangeColor(), 1000);

    stopButton.disabled = false;
    stopButton.classList.toggle('btnActive');
    startButton.disabled = true;
    startButton.classList.toggle('btnActive');
});

stopButton.addEventListener("click", () => {
    clearInterval(timerId);

    startButton.disabled = false;
    stopButton.classList.toggle('btnActive');
    stopButton.disabled = true;
    startButton.classList.toggle('btnActive');
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onChangeColor(event) {
    body.style.backgroundColor = getRandomHexColor();
};    
