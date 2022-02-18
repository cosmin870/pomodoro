const progressCircle = document.getElementById("progress_circle");

const startingMInutes = 0.5;
let time = startingMInutes * 60;
let offset = 0;
const timer = document.getElementById("timer");

const clock = setInterval(
  (updateCountdown = () => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.innerHTML = `${minutes}:${seconds}`;

    time--;
    offset += 9.354838709677419;
    progressCircle.style.strokeDashoffset = Math.round(offset) + "%";

    if (time == -1) {
      clearInterval(clock);
      // setTimeout(() => {
      //   timer.innerHTML = "0:00";
      // }, 1000);
    }

    console.log(time);
    console.log(offset);
  }),
  1000
);

// let i = 0;
// function move(time) {
//   if (i == 0) {
//     i = 1;
//     let offset = 0;
//     const id = setInterval(frame, time * 3.55);
//     function frame() {
//       if (offset == 290) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         offset++;
//         progressCircle.style.strokeDashoffset = offset + "%";
//         console.log(i);
//       }
//     }
//   }
// }

// move(time);
