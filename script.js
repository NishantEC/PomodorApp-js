// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;




const TIME_LIMIT = 200;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = -1;
let isPlaying = false;

document.getElementById("base-timer-label").textContent = formatTime(
  timeLeft
)
function onTimesUp() {
  clearInterval(timerInterval);
  document.getElementById("play-btn").textContent="Start";
  document.getElementById("play-btn").style.backgroundColor = "#A22BD1";
}

function startTimer() {
  isPlaying = true;
    document.getElementById("play-btn").textContent="Pause";
    document.getElementById("play-btn").style.backgroundColor = "#D0B3FF";
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();


    if (timeLeft === 0) {
      document.getElementById("base-timer-label").innerHTML = formatTime(
        TIME_LIMIT);
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}


function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    (calculateTimeFraction() * FULL_DASH_ARRAY)
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function playActivity(){
if(!isPlaying)
  {startTimer();
    isPlaying = true;
    document.getElementById("play-btn").textContent="Pause";
    document.getElementById("play-btn").style.backgroundColor = "#D0B3FF";
  }
    else{
      onTimesUp();
      isPlaying = false;
      
    }

}

function resetTimer() {
  if (timerInterval) {
    onTimesUp();
  }
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  timerInterval = null;

  document.getElementById('base-timer-label').innerHTML = formatTime(timeLeft);
  setCircleDasharray();

}