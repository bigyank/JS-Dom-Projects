// Analog clock
const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
  const date = new Date();
  const seconds = date.getSeconds();

  if (seconds == 0) {
    secondHand.style.transitionDuration = "0s";
    minuteHand.style.transitionDuration = "0s";
    hourHand.style.transitionDuration = "0s";
  } else {
    secondHand.style.transitionDuration = "0.05s";
    minuteHand.style.transitionDuration = "0.05s";
    hourHand.style.transitionDuration = "0.05s";
  }

  const secondDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;

  const minutes = date.getMinutes();
  const minuteDegrees = (minutes / 60) * 360 + 90;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

  const hours = date.getHours();
  const hourDegrees = (hours / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDigiDate, 1000);

// Digital Clock
const hourDigi = document.querySelector(".hour-digi");
const minuteDigi = document.querySelector(".minute-digi");
const secondDigi = document.querySelector(".second-digi");

function setDigiDate() {
  const date = new Date();
  const hour = date.getHours();
  hourDigi.textContent = hour;

  const minute = date.getMinutes();
  minuteDigi.textContent = minute;

  const second = date.getSeconds();
  secondDigi.textContent = second;
}

setInterval(setDate, 1000);
