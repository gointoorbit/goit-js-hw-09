const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;

const stopBtnDisabled = () => {
  startBtn.removeAttribute('disabled', 'true');
  stopBtn.setAttribute('disabled', 'true');
};

const startBtnDisabled = () => {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled', 'true');
};

stopBtnDisabled();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId;

const changeColor = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const stopChangingColor = () => {
  clearInterval(timerId);
};

startBtn.addEventListener('click', changeColor);
startBtn.addEventListener('click', startBtnDisabled);

stopBtn.addEventListener('click', stopChangingColor);
stopBtn.addEventListener('click', stopBtnDisabled);
