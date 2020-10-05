const mainDiv = document.querySelector(".sketch__pad");
const slider = document.getElementById("divRange");
const sliderValue = document.querySelector(".slidervalue");
const resetBtn = document.getElementById("grid-reset");

function createGrid(numberOfDivs) {
  [...Array(numberOfDivs)].map((e) => {
    const newDiv = document.createElement("button");
    newDiv.className = "sketch__box";

    mainDiv.appendChild(newDiv);
  });
}

function changeBgColor({ target }) {
  if (!target.closest("button")) return;
  const color =
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  target.style.backgroundColor = color;
}

function newGrids(a, b) {
  // we want to have enough cells in our grid
  mainDiv.style.gridTemplateRows = `repeat(${a}, 1fr)`;
  mainDiv.style.gridTemplateColumns = `repeat(${b}, 1fr)`;

  // this code purges the parentContainer, then adds containers as requested
  mainDiv.innerHTML = "";
  createGrid(a * b);
}

function updateOnSlide({ target }) {
  sliderValue.textContent = `${target.value} x ${target.value}`;
  newGrids(target.value, target.value);
}

createGrid(16 * 16);
mainDiv.addEventListener("mouseover", changeBgColor);
slider.addEventListener("input", updateOnSlide);
resetBtn.addEventListener("click", () => {
  newGrids(16, 16);
  slider.value = 16;
  sliderValue.textContent = "16 x 16";
});
