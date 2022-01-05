import Notiflix from 'notiflix';
const form = document.querySelector('.form');
console.log(form);
let position = 0;

form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);
  console.log(delay, step, amount);

  setInterval(() => {
    if (position < amount) {
      position += 1;
      setTimeout(() => {
        delay += step;
      });

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
    return;
  }, delay);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
  return promise;
}

function onSuccess(result) {
  console.log(result);
}

function onError(error) {
  console.log(error);
}
