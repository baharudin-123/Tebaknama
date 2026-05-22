let pathChoice = "";
let currentQuestion = 0;
let hearts = 3;
let timer = 10;
let timerInterval;

let currentLevel = 0;

// ================= QUIZ =================
const quizQuestions = {
  santuy: [
    {
      question: "Kalau ada gorengan terakhir...",
      options: ["Ambil 😎", "Tanya dulu", "Pura-pura ga liat", "Tarung 😭"],
      correct: 1
    },
    {
      question: "Kalau jadi mie instan...",
      options: ["Rebus 🍜", "Goreng 🔥", "Mentah 😭", "Jadi bumbu"],
      correct: 0
    },
    {
      question: "Kalau rebahan...",
      options: ["Lurus", "Miring", "Tengkurep", "Kayak udang 😭"],
      correct: 1
    }
  ],

  chaos: [
    {
      question: "Kalau tiba-tiba jadi benda...",
      options: ["Kulkas 🧊", "Remote ilang 😭", "Sendal", "Kasur"],
      correct: 1
    },
    {
      question: "Kalau lihat chat 'serius ya'...",
      options: ["Biasa", "Panik", "Kabur 😭", "Overthinking"],
      correct: 3
    },
    {
      question: "Kalau lagi gabut...",
      options: ["Main HP", "Tidur", "Ngeliatin kipas 😭", "Scroll"],
      correct: 2
    }
  ]
};

// ================= GAME TEBak POSE =================
const levels = [
  {
    photo: "fotoay.jpg.jpeg",
    clues: [
      "🧩 Berdiri tapi bukan ngantri",
      "🧩 Ada kaca di depannya",
      "🧩 Pegang HP",
      "🧩 Lihat diri sendiri",
      "🧩 Cari angle terbaik"
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
      "🧩 Hadap kamera",
      "🧩 Lagi nyengir",
      "🧩 Ada dua jari ✌️",
      "🧩 Pose santai",
      "🧩 Kaya lagi happy 😭"
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

// ================= START =================
function showPathChoice() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("pathScreen").style.display = "block";
}

function selectPath(path) {
  pathChoice = path;
  document.getElementById("pathScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  loadQuestion();
}

// ================= QUIZ =================
function loadQuestion() {
  const q = quizQuestions[pathChoice][currentQuestion];

  timer = 10;
  updateTimer();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer--;
    updateTimer();

    if (timer <= 0) {
      loseHeart();
      nextQuestion();
    }
  }, 1000);

  document.getElementById("questionNumber").innerText =
    `Pertanyaan ${currentQuestion + 1}/3`;

  document.getElementById("questionText").innerText =
    q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    optionsDiv.innerHTML += `
      <button class="option-btn" onclick="selectAnswer(${index})">
        ${option}
      </button>
    `;
  });
}

function selectAnswer(index) {
  clearInterval(timerInterval);

  const q = quizQuestions[pathChoice][currentQuestion];

  if (index !== q.correct) {
    loseHeart();
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;

  if (hearts <= 0) {
    gameOver();
    return;
  }

  if (currentQuestion < 3) {
    loadQuestion();
  } else {
    showRandomEvent();
  }
}

// ================= HEART =================
function loseHeart() {
  hearts--;
  updateHearts();
}

function updateHearts() {
  document.getElementById("hearts").innerText =
    "❤️".repeat(hearts);
}

function updateTimer() {
  document.getElementById("timer").innerText =
    `⏳ ${timer}`;
}

// ================= RANDOM EVENT =================
function showRandomEvent() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("eventScreen").style.display = "block";
}

function randomEvent(choice) {
  let msg = "";

  if (choice === "ambil") {
    hearts = Math.min(3, hearts + 1);
    msg = "Kamu nemu aura absurd. +1 nyawa 😭";
  } else if (choice === "tendang") {
    msg = "Bendanya ternyata sandal galau 😭";
  } else {
    msg = "Kamu kabur dengan selamat 🏃";
  }

  updateHearts();

  document.getElementById("eventMessage").innerText = msg;

  setTimeout(() => {
    document.getElementById("eventScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    loadLevel();
  }, 1800);
}

// ================= TEBak POSE =================
function loadLevel() {
  const level = levels[currentLevel];

  document.getElementById("levelText").innerText =
    `Level ${currentLevel + 1}/2`;

  document.getElementById("progress").style.width =
    ((currentLevel) / levels.length) * 100 + "%";

  const cluesDiv = document.getElementById("clues");
  cluesDiv.innerHTML = "";

  level.clues.forEach(clue => {
    cluesDiv.innerHTML += `<p>${clue}</p>`;
  });

  const optionsDiv = document.getElementById("gameOptions");
  optionsDiv.innerHTML = "";

  level.options.forEach(option => {
    optionsDiv.innerHTML += `
      <button class="option-btn" onclick="checkAnswer('${option}')">
        ${option}
      </button>
    `;
  });

  document.getElementById("message").innerText = "";
  document.getElementById("photoBox").style.display = "none";
}

function checkAnswer(selected) {
  const level = levels[currentLevel];

  if (selected === level.answer) {
    const photo = document.getElementById("photo");
    photo.src = level.photo;
    photo.classList.remove("clear-photo");

    document.getElementById("photoBox").style.display = "block";
    document.getElementById("message").innerText =
      "🎉 Benarrr 😭🔥";

    setTimeout(() => {
      photo.classList.add("clear-photo");
    }, 500);

    if (currentLevel === levels.length - 1) {
      document.getElementById("nextBtn").innerText =
        "Final Boss 👹";
    }

  } else {
    document.getElementById("message").innerText =
      "Salah 😭 coba lagi";
  }
}

function nextLevel() {
  currentLevel++;

  if (currentLevel < levels.length) {
    loadLevel();
  } else {
    showBoss();
  }
}

// ================= BOSS =================
function showBoss() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("bossScreen").style.display = "block";

  const bossOptions = [
    "NPC warung",
    "Makhluk absurd premium",
    "Kulkas capek",
    "Sendal insecure"
  ];

  const div = document.getElementById("bossOptions");
  div.innerHTML = "";

  bossOptions.forEach(option => {
    div.innerHTML += `
      <button class="option-btn" onclick="checkBoss('${option}')">
        ${option}
      </button>
    `;
  });
}

function checkBoss(choice) {
  if (choice === "Makhluk absurd premium") {
    finishGame();
  } else {
    document.getElementById("bossMessage").innerText =
      "Boss tertawa 😭 coba lagi";
  }
}

// ================= FINISH =================
function finishGame() {
  document.getElementById("bossScreen").style.display = "none";
  document.getElementById("finishScreen").style.display = "block";

  let achievement = "";

  if (hearts === 3) {
    achievement = "🔥 ABSURD LORD";
  } else if (hearts === 2) {
    achievement = "😎 Makhluk Santuy";
  } else {
    achievement = "😭 Chaos Survivor";
  }

  document.getElementById("achievementText").innerText =
    achievement;
}

function gameOver() {
  alert("💀 Game Over — Dunia absurd menang 😭");
  location.reload();
}