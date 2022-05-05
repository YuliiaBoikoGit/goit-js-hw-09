import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const form = document.querySelector('.form');
const amountInput = form.elements.amount;
const delayInput = form.elements.delay;
const stepInput = form.elements.step;

let promiseCounter = 0;
let delay = 0;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  callPromises(amountInput.value);
};

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }

      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
};

function onCreatePromiseSuccess(result) {
  Notiflix.Notify.success(result);
};

function onCreatePromiseError(error) {
  Notiflix.Notify.failure(error);
};

function callPromises(amount) {
  delay = Number(delayInput.value) - Number(stepInput.value);

  for (let i = 0; i < amount; i++) {
    promiseCounter += 1;
    delay += Number(stepInput.value);

    createPromise(promiseCounter, delay)
      .then(onCreatePromiseSuccess).catch(onCreatePromiseError);
  };

  promiseCounter = 0;
  clearTimeout();
};



