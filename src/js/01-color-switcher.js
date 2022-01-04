const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.setAttribute('disabled', 'disabled');

let timerID = null;

startBtn.addEventListener(`click`, onStartClick);
stopBtn.addEventListener(`click`, onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');

  timerID = setInterval(() => {
    changeBgColor();
  }, 1000);
}

function onStopClick() {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
  clearInterval(timerID);
}
