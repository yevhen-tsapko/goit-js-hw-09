const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};
let timerId = null;

refs.startButton.addEventListener('click', onClickStartButton);
refs.stopButton.addEventListener('click', onClickStopButton);

function onClickStartButton() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startButton.setAttribute('disabled', true);
}
function onClickStopButton() {
  clearInterval(timerId);
  refs.startButton.removeAttribute('disabled', false);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
