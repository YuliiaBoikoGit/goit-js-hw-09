import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minsEl = document.querySelector('span[data-minutes]');
const secsEl = document.querySelector('span[data-seconds]');

let timerId = null;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0].getTime() < Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
            startBtn.classList.toggle('btnActive');

            startBtn.addEventListener('click', onStartBtnClick);

            function onStartBtnClick(event) {
                input.disabled = true;
                startBtn.disabled = true;
                startBtn.classList.toggle('btnActive');
                timerId = setInterval(() => {
                    if ((selectedDates[0].getTime() - Date.now()) < 0) {
                        clearInterval(timerId);
                        return;
                    }
                    updateClockface(convertMs(selectedDates[0].getTime() - Date.now()));
                }, 1000);
            };

            function convertMs(ms) {
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;

                const days = addLeadingZero(Math.floor((selectedDates[0].getTime() - Date.now()) / day));
                const hours = addLeadingZero(Math.floor(((selectedDates[0].getTime() - Date.now()) % day) / hour));
                const minutes = addLeadingZero(Math.floor((((selectedDates[0].getTime() - Date.now()) % day) % hour) / minute));
                const seconds = addLeadingZero(Math.floor(((((selectedDates[0].getTime() - Date.now()) % day) % hour) % minute) / second));

                return { days, hours, minutes, seconds };
            };

            function addLeadingZero(value) {
                return String(value).padStart(2, '0');
            };

            function updateClockface({ days, hours, minutes, seconds }) {
                daysEl.textContent = days;
                hoursEl.textContent = hours;
                minsEl.textContent = minutes;
                secsEl.textContent = seconds;
            };
        };
    },
};

flatpickr('#datetime-picker', options);



