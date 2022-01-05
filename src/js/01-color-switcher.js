const button = document.querySelectorAll('button');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

console.log(button);
console.log(stopBtn);

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

startBtn.style.padding = '10px 15px';
stopBtn.style.padding = '10px 15px';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  console.log(getRandomHexColor);
}

function onStopBtnClick(event) {
  clearInterval(timerId);
  startBtn.disabled = false;
}
