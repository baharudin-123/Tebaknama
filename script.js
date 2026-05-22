let currentLevel = 0;
let score = 0;

const levels = [
  {
    photo: "fotoay.jpeg",
    clues: [
      "🧩 Berdiri tapi bukan ngantri",
      "🧩 Ada kaca di depannya",
      "🧩 Ngeliat dirinya sendiri",
      "🧩 Pegang HP",
      "🧩 Nyari angle terbaik",
      "🧩 Hasilnya sering masuk story 😭"
    ],
    options: [
      "Orang lagi foto mirror",
      "Orang lagi marahin kaca",
      "Orang lagi nyari jin",
      "Orang lagi jual parfum"
    ],
    answer: "Orang lagi foto mirror"
  },

  {
    photo: "fotoay2.jpeg",
    clues: [
      "🧩 Ngadep kamera",
      "🧩 Lagi nyengir / senyum",
      "🧩 Tangannya ga diem",
      "🧩 Ada dua jari naik ✌️",
      "🧩 Pose santai & lucu",
      "🧩 Bukan minta 2 bakso 😭"
    ],
    options: [
      "Orang lagi pose 2 jari sambil nyengir",
      "Orang lagi minta 2 bakso",
      "Orang lagi nunjuk jalan",
      "Orang lagi ngancem kipas"
    ],
    answer: "Orang lagi pose 2 jari sambil nyengir"
  }
];

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  loadLevel();
}

function loadLevel() {
  const level = levels[currentLevel];

  document.getElementById("levelText").innerText =
    `Level ${currentLevel + 1}/2`;

  document.getElementById("progress").style.width =
    ((currentLevel) / 2) * 100 + "%";

  const cluesDiv = document.getElementById("clues");
  cluesDiv.innerHTML = "";
  level.clues.forEach(clue => {
    cluesDiv.innerHTML += `<p>${clue}</p>`;
  });

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  level.options.forEach(option => {
    optionsDiv.innerHTML += `
      <button class="option" onclick="checkAnswer('${option}')">
        ${option}
      </button>
    `;
  });

  document.getElementById("message").innerText = "";
  document.getElementById("result").style.display = "none";
}

function checkAnswer(selected) {
  const level = levels[currentLevel];

  if (selected === level.answer) {
    score++;

    document.getElementById("message").innerText =
      "🎉 BENERRR 😭🔥";

    document.getElementById("photo").src = level.photo;
    document.getElementById("result").style.display = "block";

    if (currentLevel === levels.length - 1) {
      document.getElementById("nextBtn").innerText = "Selesai 😭";
    }

  } else {
    document.getElementById("message").innerText =
      "Salah bos 😭 coba lagi";
  }
}

function nextLevel() {
  currentLevel++;

  if (currentLevel < levels.length) {
    loadLevel();
  } else {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("finishScreen").style.display = "block";
    document.getElementById("scoreText").innerText =
      `Score lu: ${score}/2 🔥`;
  }
}