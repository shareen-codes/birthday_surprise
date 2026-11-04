const screens = {
  1: document.getElementById("welcome"),
  2: document.getElementById("gallery"),
  3: document.getElementById("letter")
};

const stepLabel = document.getElementById("stepLabel");

function goToStep(step) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });

  screens[step].classList.add("active");

  const labels = {
    1: "A SPECIAL DAY • 01 / 03",
    2: "OUR MEMORIES • 02 / 03",
    3: "FROM THE HEART • 03 / 03"
  };

  stepLabel.textContent = labels[step];

  // Reset the envelope whenever the letter screen is opened.
  if (step === 3) {
    document.getElementById("envelope").classList.remove("open");
    document.getElementById("openLetterBtn").hidden = false;
    document.getElementById("letterInstruction").textContent =
      "Tap the button to open your special letter.";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openLetter() {
  const envelope = document.getElementById("envelope");
  const button = document.getElementById("openLetterBtn");
  const instruction = document.getElementById("letterInstruction");

  envelope.classList.add("open");
  button.hidden = true;

  instruction.textContent =
    "A little message, written especially for your birthday. ❤️";
}

// Floating hearts in the background
const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (12 + Math.random() * 16) + "px";
  heart.style.animationDuration = (7 + Math.random() * 6) + "s";

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 400);
}

setInterval(createHeart, 900);

const gamePhotos = document.querySelectorAll(".game-photo");
const gameStatus = document.getElementById("gameStatus");
const attemptCount = document.getElementById("attemptCount");
const secretMessage = document.getElementById("secretMessage");
const restartGameButton = document.getElementById("restartGame");

let hiddenHeartIndex;
let attempts = 0;
let gameWon = false;

function startHeartGame() {
  hiddenHeartIndex = Math.floor(Math.random() * gamePhotos.length);
  attempts = 0;
  gameWon = false;

  attemptCount.textContent = attempts;
  gameStatus.textContent = "Choose a picture to find the secret heart! 💗";
  secretMessage.hidden = true;

  gamePhotos.forEach((photo) => {
    photo.disabled = false;
    photo.classList.remove("correct", "wrong");
  });
}

function checkPhoto(index) {
  if (gameWon) return;

  attempts++;
  attemptCount.textContent = attempts;

  const clickedPhoto = gamePhotos[index];
  clickedPhoto.classList.remove("wrong");

  if (index === hiddenHeartIndex) {
    gameWon = true;
    clickedPhoto.classList.add("correct");

    gameStatus.textContent = "You found it! My secret heart is yours! ❤️";
    secretMessage.hidden = false;

    gamePhotos.forEach((photo) => {
      photo.disabled = true;
    });

    const nextButton = document.querySelector(
      '[onclick*="letter"], [data-next="letter"]'
    );

    if (nextButton) {
      nextButton.disabled = false;
    }
  } else {
    clickedPhoto.classList.add("wrong");
    gameStatus.textContent = "Not here! Try another picture. 💕";

    window.setTimeout(() => {
      clickedPhoto.classList.remove("wrong");
    }, 400);
  }
}

gamePhotos.forEach((photo) => {
  photo.addEventListener("click", () => {
    checkPhoto(Number(photo.dataset.index));
  });
});

restartGameButton.addEventListener("click", startHeartGame);

startHeartGame();