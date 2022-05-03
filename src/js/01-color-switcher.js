const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId = null;

stopButton.disabled = true;

startButton.addEventListener("click", () => {
    timerId = setInterval(() => onChangeColor(), 1000);

    stopButton.disabled = false;
    startButton.disabled = true;
});

stopButton.addEventListener("click", () => {
    clearInterval(timerId);

    startButton.disabled = false;
    stopButton.disabled = true;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onChangeColor(event) {
    body.style.backgroundColor = getRandomHexColor();
};    
