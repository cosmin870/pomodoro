const progressCircle = document.getElementById("progress_circle");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short_break");
const longBreak = document.getElementById("long_break");

let startingMInutes = 0.1;
let time = startingMInutes * 60;

let offset = 0;
let isPaused = true;

const init = () => {
  if (isPaused == false) {
    const clock = setInterval(
      (updateCountdown = () => {
        console.log(time);
        if (time == 0 || isPaused == true) {
          clearInterval(clock);
        } else if (time == 0) {
          progressCircle.style.strokeWidth = 0 + "px"; //dispare bulina de la sfarsit
        }

        // reset timer when it's finished
        if (time <= 0) {
          isPaused = true;
          checkFinished();
        }

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer.innerHTML = `${minutes}:${seconds}`;

        time--;
        //plus one second offset
        offset += 38.57142857142857;
        progressCircle.style.strokeDashoffset = Math.round(offset) + "%";
      }),
      1000
    );
  }
};

const checkFinished = () => {
  setTimeout(() => {
    time = 6; //aici fac legatura cu timpul din  butoane
    offset = 0;
    progressCircle.style.strokeDashoffset = Math.round(offset) + "%";
    progressCircle.style.strokeWidth = 13 + "px";
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    console.log("checked");
  }, 1000);
};

//anti-spam function for start/stop buttons (i tried my best)

let timeout = 2000;
let preventSpam = 1;

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hide");
  pauseBtn.classList.add("show");
  console.log("porneste");
  //anti spam

  if (preventSpam <= 2) {
    isPaused = false;
    init();
    preventSpam++;
    for (let i = 0; i < preventSpam; i++) {
      timeout += 35;
    }
    console.log("timeout " + timeout);
    console.log("prevent spam initial = " + preventSpam);
  }

  if (preventSpam > 0) {
    const antiSpam = setInterval(() => {
      console.log("A PORNIT INTERVALUL");
      preventSpam = 1;
      console.log(preventSpam + " spam dupa interval");
      if (preventSpam <= 2) clearInterval(antiSpam);
    }, timeout);
  }
});

pauseBtn.addEventListener("click", () => {
  startBtn.classList.remove("hide");
  pauseBtn.classList.remove("show");
  isPaused = true;
  preventSpam++;
  console.log("prevent spam dupa PAUZA = " + preventSpam);
  console.log("S T O P");
});
