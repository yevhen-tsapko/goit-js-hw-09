const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const initialDatas = {};
  formData.forEach((value, name) => {
    initialDatas[name] = Number(value);
    createPromises(initialDatas);
  });
}
function createPromises({ delay, step, amount }) {
  for (let i = 0; i < amount; i += 1) {
    let currettDelay = delay + i * step;
    createPromise(i + 1, currettDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
