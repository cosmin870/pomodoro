const progressCircle = document.getElementById("progress_circle");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const startingMInutes = 0.1;
let time = startingMInutes * 60;
let offset = 0;

let isPaused = true;

const init = () => {
  if (isPaused == false) {
    const clock = setInterval(
      (updateCountdown = () => {
        console.log(time);
        console.log(offset);
        if (time == -1 || isPaused == true) {
          clearInterval(clock);
        }

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.innerHTML = `${minutes}:${seconds}`;

        time--;
        offset += 48.33333333333333;
        progressCircle.style.strokeDashoffset = Math.round(offset) + "%";
      }),
      1000
    );
  }
};

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hide");
  pauseBtn.classList.add("show");
  isPaused = false;
  init();
});

pauseBtn.addEventListener("click", () => {
  startBtn.classList.remove("hide");
  pauseBtn.classList.remove("show");
  isPaused = true;
  init();
});
