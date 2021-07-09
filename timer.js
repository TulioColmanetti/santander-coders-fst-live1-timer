// start code only after page finished loading
window.addEventListener('load', startProgram);

// global timer count values, in seconds and miliseconds
let global_sec = 180;
let global_curr_sec = global_sec;
let global_miliSec = 0;
let global_curr_miliSec = global_miliSec;

// retrieve timer display div element - API "document" is made available by the browser
const timerDisplayDiv = document.getElementById('timerDisplay');

// timer handler variable
let timerHandler = null;

// return left time formatted as min:sec:milisec (e.g. 02:59:99)
function formatTime(sec, miliSec) {
  if (sec > 0 || miliSec > 0) {
    // return the lowest integer from division result
    let leftMin = Math.floor(sec / 60);
    let leftSec = sec % 60;
    let leftMiliSec = miliSec;

    // format miliseconds
    if (leftMiliSec < 10) {
      leftMiliSec = `0${leftMiliSec}`;
    }

    // format seconds
    if (leftSec < 10) {
      leftSec = `0${leftSec}`;
    }

    // format minutes
    if (leftMin < 10) {
      leftMin = `0${leftMin}`;
    }

    return `${leftMin} : ${leftSec} : ${leftMiliSec}`;
  } else return 'Finished!';
}

// render timer display
function renderTimer() {
  timerDisplayDiv.innerHTML = formatTime(global_curr_sec, global_curr_miliSec);
}

// add event listeners for buttons
function startProgram() {
  const btnStartTimer = document.getElementById('btnStart');
  btnStartTimer.addEventListener('click', startTimer);

  const btnStopTimer = document.getElementById('btnStop');
  btnStopTimer.addEventListener('click', stopTimer);

  const btnResetTimer = document.getElementById('btnReset');
  btnResetTimer.addEventListener('click', resetTimer);

  const btnDecreaseTimer = document.getElementById('btnDec');
  btnDecreaseTimer.addEventListener('click', decreaseTimer);

  const btnIncreaseTimer = document.getElementById('btnInc');
  btnIncreaseTimer.addEventListener('click', increaseTimer);

  renderTimer();
}

// start timer countdown
function startTimer() {
  const secpass = () => {
    // check if there are 0 seconds and 0 miliseconds left (timer finish condition)
    if (global_curr_sec > 0 || global_curr_miliSec > 0) {
      // perform countdown from 99 to 0 each 10ms, equivalent to 1000ms (100 * 10ms)
      if (global_curr_miliSec === 0) {
        global_curr_sec--;
        global_curr_miliSec = 99;
      } else global_curr_miliSec--;
    } else stopTimer();

    renderTimer();
  };

  if (!timerHandler)
    // interval time, in miliseconds
    timerHandler = setInterval(secpass, 10);
}

// stop timer countdown
function stopTimer() {
  clearInterval(timerHandler);
  timerHandler = null;
}

// reset timer countdown, but do not stop timer
function resetTimer() {
  global_curr_sec = global_sec;
  global_curr_miliSec = global_miliSec;
  renderTimer();
}

// increase timer countdown by 10 seconds, but do not stop timer
function increaseTimer() {
  global_sec = global_sec + 10;
  resetTimer();
}

// decrease timer countdown by 10 seconds, but do not stop timer
function decreaseTimer() {
  if (global_sec > 10) global_sec = global_sec - 10;
  else global_sec = 0;
  resetTimer();
}
