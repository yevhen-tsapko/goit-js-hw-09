import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDay = 0;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDay = selectedDates[0].getTime();

    if (calcTimeDifference(selectedDay) <= 0) {
      // Notiflix.Notify.warning('Please choose a date in the futuree');
      window.alert('Please choose a date in the future');
    } else {
      refs.startButton.removeAttribute('disabled');
      refs.startButton.addEventListener('click', onTimerButtonClick);
    }
  },
};
const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
// refs.startButton.setAttribute('disabled', 'disabled');
const fp = flatpickr(refs.datetimePicker, options);

function calcTimeDifference() {
  if (selectedDay - Date.now() <= 0) {
    clearInterval(timerId);
    return 0;
  }
  return selectedDay - Date.now();
}
function onTimerButtonClick() {
  timerId = setInterval(() => {
    outputTime(convertMs(calcTimeDifference()));
  }, 1000);
}

function outputTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = String(hours).padStart(2, '0');
  refs.minutes.textContent = String(minutes).padStart(2, '0');
  refs.seconds.textContent = String(seconds).padStart(2, '0');
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
