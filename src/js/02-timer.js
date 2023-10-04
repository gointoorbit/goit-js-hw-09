import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button');

startBtn.setAttribute('disabled', 'true');

let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDate - new Date() > 0) {
      startBtn.removeAttribute('disabled', 'true');
    } else {
      startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    }
  },
};

let calendar = flatpickr('#datetime-picker', options);

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const createTimer = () => {
  let remainingTime = selectedDate - new Date();
  convertMs(remainingTime);
  addLeadingZero();
  timerDays.textContent = timer.days;
  timerHours.textContent = timer.hours;
  timerMinutes.textContent = timer.minutes;
  timerSeconds.textContent = timer.seconds;
  setInterval(() => {
    remainingTime = selectedDate - new Date();
    if (remainingTime >= 0) {
      convertMs(remainingTime);
      addLeadingZero();
      timerDays.textContent = timer.days;
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    }
  }, 1000);
};

startBtn.addEventListener('click', createTimer);
let clock = {};

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

  return (clock = { days, hours, minutes, seconds });
}

const timer = {};

const addLeadingZero = () => {
  for (let time in clock) {
    timer[time] = clock[time].toString().padStart(2, '0');
  }
  return timer;
};
