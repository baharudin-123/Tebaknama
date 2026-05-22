// ==================== QUIZ LUCU ====================
let currentQuestion = 0;
let totalScore = 0;

const quizQuestions = [
  {
    question: "Kalau jadi mie instan, lu milih jadi apa?",
    options: ["Rebus 🍜", "Goreng 🔥", "Dimakan mentah 😭", "Jadi bumbu doang 🤡"]
  },
  {
    question: "Kalau tiba-tiba jadi hewan...",
    options: ["Kucing 🐱", "Monyet 🐒", "Bebek 🦆", "Capybara 😭"]
  },
  {
    question: "Superpower yang lu pilih?",
    options: ["Ngilang 👻", "Teleport ⚡", "Baca pikiran 🧠", "Tau siapa yg makan gorengan terakhir 😭"]
  },
  {
    question: "Gaya rebahan paling valid?",
    options: ["Lurus 😐", "Miring 😎", "Tengkurep 🛌", "Kayak udang 😭"]
  },
  {
    question: "Kalau ada chat 'gw mau ngomong serius'...",
    options: ["Biasa aja", "Panik 👀", "Kabur 😭", "Overthinking 🤯"]
  },
  {
    question: "Kalau disuruh milih kendaraan absurd...",
    options: ["Sapu 🧹", "Kulkas jalan ❄️", "Kasur terbang 😭", "Becak turbo 🚀"]
  },
  {
    question: "Kalau lagi gabut...",
    options: ["Main HP 📱", "Tidur 😴", "Scroll ga jelas 😭", "Ngeliatin kipas 🤡"]
  },
  {
    question: "Kalau ada gorengan terakhir...",
    options: ["Ambil 😎", "Tanya dulu", "Pura-pura ga liat 😭", "Tarung 🤺"]
  },
  {
    question: "Kalau jadi benda...",
    options: ["Sendal 🩴", "Kulkas 🧊", "Kursi 🪑", "Remote ilang 😭"]
  },
  {
    question: "Jujur ya, lu tuh orangnya...",
    options: ["Santuy 😐", "Random 🤡", "Chaos 😭", "Absurd premium 🔥"]
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

// ==================== QUIZ ====================
function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";
  loadQuestion();
}

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

function selectAnswer(score) {
  totalScore += score;
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    loadQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  let result = "";

  if (totalScore <= 7) {
    result =
      "😐 Lu tipe NPC santuy. Hidup jalan, tapi aura kayak figuran warung.";
  } else if (totalScore <= 14) {
    result =
      "🤡 Lu random. Kadang normal, kadang ngomong sama kipas.";
  } else if (totalScore <= 21) {
    result =
      "😭 Lu chaos. Hidup lu penuh plot twist & keputusan absurd.";
  } else {
    result =
      "🔥 Lu absurd premium. Bahkan remote TV takut sama lu.";
  }

  document.getElementById("resultText").innerText = result;
}

// ==================== GAME ====================
function startGame() {
  document.getElementById("resultScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  loadLevel();
}

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
    gameScore++;

    document.getElementById("message").innerText =
      "🎉 BENERRR 😭🔥";

    document.getElementById("photo").src = level.photo;
    document.getElementById("photoBox").style.display = "block";

    if (currentLevel === levels.length - 1) {
      document.getElementById("nextBtn").innerText =
        "Selesai 😭";
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
      `Score lu: ${gameScore}/2 🔥`;
  }
}