import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

let firstDelay;
let delayStep;
let amount;
let position;
let delay;

const executePromise = event => {
  event.preventDefault();
  firstDelay = Number(document.querySelector('input[name="delay"]').value);
  delayStep = Number(document.querySelector('input[name="step"]').value);
  amount = Number(document.querySelector('input[name="amount"]').value);
  console.log({ firstDelay, delayStep, amount });

  for (let i = 1; i <= amount; i++) {
    delay = firstDelay + (i - 1) * delayStep;
    position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in delay ${delay}`);
        // console.log(`Fulfilled promise ${position} in delay ${delay}`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in delay ${delay}`);
        // console.log(`Rejected promise ${position} in delay ${delay}`);
      });

    // for (let i = 1; i <= amount; i++) {
    //   delay = firstDelay + (i - 1) * delayStep;
    // position = i;

    // setTimeout(() => {
    //   createPromise(position, delay)
    //     .then(({ position, delay }) => {
    //       console.log(`Fulfilled promise ${position} in delay ${delay}`);
    //     })
    //     .catch(({ position, delay }) => {
    //       console.log(`Rejected promise ${position} in delay ${delay}`);
    //     });
    // }, delay);
    // }
  }
};

form.addEventListener('submit', executePromise);

// setTimeout(createPromise, delay);
