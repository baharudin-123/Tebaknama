// ==================== QUIZ ====================
let currentQuestion = 0;
let totalScore = 0;

const quizQuestions = [
  {
    question: "Kalau si B tiba-tiba chat...",
    options: ["Biasa aja 😐", "Penasaran 👀", "Seneng 😭", "Deg-degan 😳"]
  },
  {
    question: "Kalau liat notif dari si B...",
    options: ["Nanti aja buka", "Langsung buka", "Pura-pura santai 😭", "Senyum sendiri 😳"]
  },
  {
    question: "Kalau si B ga chat seharian...",
    options: ["Ga peduli", "Kepikiran dikit", "Nungguin", "Cek HP terus 😭"]
  },
  {
    question: "Kalau si B upload foto baru...",
    options: ["Scroll lewat", "Liat bentar", "Zoom dikit 👀", "Stalking 😭"]
  },
  {
    question: "Kalau si B deket sama orang lain...",
    options: ["Biasa aja", "Agak aneh", "Kesel dikit", "Cemburu 😭"]
  },
  {
    question: "Kalau nama si B disebut...",
    options: ["Biasa", "Reflek nengok", "Jadi perhatian", "Senyum sendiri 😭"]
  },
  {
    question: "Kalau si B ngajak ketemu...",
    options: ["Males", "Yaudah", "Seneng", "Excited 😭"]
  },
  {
    question: "Kalau lagi gabut...",
    options: ["Main HP", "Rebahan", "Scroll medsos", "Kepikiran si B 😳"]
  },
  {
    question: "Kalau chat dari si B lama dibales...",
    options: ["Yaudah", "Nunggu", "Cek lagi", "Overthinking 😭"]
  },
  {
    question: "Kalau disuruh jujur...",
    options: ["Biasa aja", "Ada rasa penasaran", "Nyaman banget", "Waduh... ada rasa 😭🔥"]
  }
];

// ==================== GAME ====================
let currentLevel = 0;
let gameScore = 0;

const levels = [
  {
    photo: "fotoay.jpg.jpeg",
    clues: [
      "🧩 Berdiri tapi bukan ngantri",
      "🧩 Ada kaca di depannya",
      "🧩 Pegang HP",
      "🧩 Ngeliat dirinya sendiri",
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
      "🧩 Ada dua jari naik ✌️",
      "🧩 Pose santai",
      "🧩 Kaya lagi happy 😭",
      "🧩 Bukan minta 2 bakso"
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

// ==================== START QUIZ ====================
function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  loadQuestion();
}

// ==================== LOAD QUESTION ====================
function loadQuestion() {
  const q = quizQuestions[currentQuestion];

  document.getElementById("questionNumber").innerText =
    `Pertanyaan ${currentQuestion + 1}/10`;

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

// ==================== QUIZ ANSWER ====================
function selectAnswer(score) {
  totalScore += score;
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    showQuizResult();
  }
}

// ==================== SHOW QUIZ RESULT ====================
function showQuizResult() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  let result = "";

  if (totalScore <= 7) {
    result =
      "😐 Kayaknya perasaan lu ke si B masih santai & biasa aja.";
  } else if (totalScore <= 14) {
    result =
      "👀 Ada perhatian & rasa penasaran ke si B.";
  } else if (totalScore <= 21) {
    result =
      "😭 Wah... keliatan ada rasa nyaman & lumayan kepikiran si B.";
  } else {
    result =
      "😳 Bahaya... kayaknya ada rasa spesial ke si B 😭🔥";
  }

  document.getElementById("resultText").innerText = result;
}

// ==================== START GAME ====================
function startGame() {
  document.getElementById("resultScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  loadLevel();
}

// ==================== LOAD LEVEL ====================
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

// ==================== CHECK ANSWER ====================
function checkAnswer(selected) {
  const level = levels[currentLevel];

  if (selected === level.answer) {
    gameScore++;

    document.getElementById("message").innerText =
      "🎉 BENERRR 😭🔥";

    document.getElementById("photo").src =
      level.photo;

    document.getElementById("photoBox").style.display =
      "block";

    if (currentLevel === levels.length - 1) {
      document.getElementById("nextBtn").innerText =
        "Selesai 😭";
    }
  } else {
    document.getElementById("message").innerText =
      "Salah bos 😭 coba lagi";
  }
}

// ==================== NEXT LEVEL ====================
function nextLevel() {
  currentLevel++;

  if (currentLevel < levels.length) {
    loadLevel();
  } else {
    document.getElementById("gameScreen").style.display =
      "none";

    document.getElementById("finishScreen").style.display =
      "block";

    document.getElementById("scoreText").innerText =
      `Score lu: ${gameScore}/2 🔥`;
  }
}