const progressCircle = document.getElementById("progress_circle");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short_break");
const longBreak = document.getElementById("long_break");
const audio = new Audio("sounds/bell_sound.wav");

class Values {
  constructor(
    startingMInutes,
    time,
    offset,
    offsetIncrement,
    isPaused,
    cycleCounter
  ) {
    this.startingMInutes = startingMInutes;
    this.time = time = startingMInutes * 60;
    this.offset = offset;
    this.offsetIncrement = offsetIncrement;
    this.isPaused = isPaused;
    this.cycleCounter = cycleCounter;
  }
}

// let startingMInutes = 0;
// let time = startingMInutes * 60;

// let offset = 0;
// let offsetIncrement = 0;
// let isPaused = true;
// let cycleCounter = 0;

const init = () => {
  if (obj.isPaused == false) {
    const clock = setInterval(
      (updateCountdown = () => {
        console.log(obj.time);
        if (obj.time == 0 || obj.isPaused == true) {
          clearInterval(clock);
        }

        if (obj.time == 0) {
          progressCircle.style.strokeWidth = 0 + "px";
          obj.cycleCounter++;
          startBtn.innerHTML = "START#" + obj.cycleCounter;
        }

        // reset timer when it's finished
        if (obj.time <= 0) {
          obj.isPaused = true;
          checkFinished();
          audio.play();
        }

        const minutes = Math.floor(obj.time / 60);
        let seconds = obj.time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        timer.innerHTML = `${minutes}:${seconds}`;

        obj.time--;
        //plus one second offset
        obj.offset += obj.offsetIncrement;
        progressCircle.style.strokeDashoffset = Math.round(obj.offset) + "%";
      }),
      1000
    );
  }
};

const checkFinished = () => {
  setTimeout(() => {
    obj.time = undefined; //aici fac legatura cu timpul din  butoane
    obj.offset = 0;
    progressCircle.style.strokeDashoffset = Math.round(obj.offset) + "%";
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
    obj.isPaused = false;
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
  obj.isPaused = true;
  preventSpam++;
  console.log("prevent spam dupa PAUZA = " + preventSpam);
  console.log("S T O P");
});

// upper tab buttons-start constructor

pomodoro.addEventListener("click", () => {
  obj = new Values(25, undefined, 0, 0.1798800799467022, true, 0);
  timer.innerHTML = "25:00";
});

shortBreak.addEventListener("click", () => {
  obj = new Values(5, undefined, 0, 0.8970099667774086, true, 0);
  timer.innerHTML = "5:00";
});

longBreak.addEventListener("click", () => {
  obj = new Values(15, undefined, 0, 0.2996670366259711, true, 0);
  timer.innerHTML = "15:00";
});

let obj = new Values(25, undefined, 0, 0.1798800799467022, true, 0);
