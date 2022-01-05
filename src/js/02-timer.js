import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const currentTime = Date.now();
const startBtn = document.querySelector('button');
const dateDays = document.querySelector('span[data-days]');
const dateHours = document.querySelector('span[data-hours]');
const dateMinutes = document.querySelector('span[data-minutes]');
const dateSeconds = document.querySelector('span[data-seconds]');

let endDate = 0;
let ms = 0;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(datePicker);
    const selectedDate = selectedDates[0].getTime();
    if (Date.now() > selectedDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      console.log('Wrong date!');
      return;
    } else {
      startBtn.disabled = false;

      endDate = selectedDates[0];
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  let intervalId = null;

  intervalId = setInterval(() => {
    const timeToStart = Date.now();
    ms = endDate - timeToStart;

    if (ms > 0) {
      console.log(ms);
      ms -= 1;

      let timeComponents = convertMs(ms);
      console.log(timeComponents);
      dateDays.innerHTML = timeComponents.days;
      dateHours.innerHTML = timeComponents.hours;
      dateMinutes.innerHTML = timeComponents.minutes;
      dateSeconds.innerHTML = timeComponents.seconds;
    }
  }, 1000);

  console.log('It starts!');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
