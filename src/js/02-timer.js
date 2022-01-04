import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const currentDate = Date.now();

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChooseDate();
  },
};

flatpickr(input, options);

startBtn.addEventListener(`click`, onStartClick);

function onStartClick() {
  startBtn.disabled = true;
  input.disabled = true;

  let timerId = setInterval(() => {
    selectedDate = new Date(input.value).getTime();
    const currentDate = Date.now();
    const restOfTime = selectedDate - currentDate;
    const countdownTime = convertMs(restOfTime);

    dataDays.textContent = addLeadingZero(countdownTime.days);
    dataHours.textContent = addLeadingZero(countdownTime.hours);
    dataMinutes.textContent = addLeadingZero(countdownTime.minutes);
    dataSeconds.textContent = addLeadingZero(countdownTime.seconds);

    if (restOfTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function onChooseDate() {
  selectedDate = new Date(input.value).getTime();
  if (selectedDate < currentDate) {
    startBtn.disabled = true;
    return Notify.failure('Please choose a date in the future');
  }
  startBtn.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}
