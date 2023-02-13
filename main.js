const row = 3,
  cols = 3;
const colors = [
  "#9b5de5",
  "#f15bb5",
  "#00bbf9",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
];

const items = document.querySelectorAll(".item");
const modalContainer = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal-btn");
const modalP = document.querySelector(".modal p");
const scoreText = document.querySelector("#score");
const step = document.querySelector("#step");

step.addEventListener("click", function () {
  modalContainer.classList.remove("show");
  initialGame();
});

let score;

initialGame();

function initialGame() {
  score = 0;
  scoreText.innerText = "امتیاز شما :  " + score;
  colorizeItems();
}

function colorizeItems() {
  let mainColor = colors[Math.floor(Math.random() * colors.length)];
  items.forEach((item) => (item.style.backgroundColor = mainColor));

  let target = Math.floor(Math.random() * (row * cols));
  items[target].style.backgroundColor = lightenColor(mainColor, 50);

  items.forEach((item, number) => {
    if (target === number) {
      item.removeEventListener("click", loseGame);
      item.addEventListener("click", nextLevel);
    } else {
      item.removeEventListener("click", nextLevel);
      item.addEventListener("click", loseGame);
    }
  });
}

function lightenColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

function nextLevel() {
  score++;
  scoreText.innerText = "امتیاز شما :  " + score;
  colorizeItems();
}
function loseGame() {
  modalP.innerText = "امتیاز شما :  " + score;
  modalContainer.classList.add("show");
}
