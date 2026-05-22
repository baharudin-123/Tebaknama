const secretPassword = "ayra123";
function checkPassword() {
  const input =
    document.getElementById("passwordInput").value.trim();

  if (input === secretPassword) {
    startGame();
  } else {
    document.getElementById("passwordMessage").innerText =
      "❌ Password salah 😭";
  }
}
let currentQuestion = 0;

const photos = [
  "fotoay.jpg.jpeg",
  "fotoay2.jpeg",
  "fotoay3.jpeg"
];

const questions = [
  // ===== FOTO 1 =====
  {
    question: "12 + 8 = ?",
    options: ["20", "18", "22", "21"],
    correct: 0
  },
  {
    question: "Planet terbesar di tata surya?",
    options: ["Mars", "Jupiter", "Venus", "Saturnus"],
    correct: 1
  },
  {
    question: "5 x 6 = ?",
    options: ["30", "25", "35", "28"],
    correct: 0
  },
  {
    question: "Ibu kota Jepang?",
    options: ["Kyoto", "Osaka", "Tokyo", "Seoul"],
    correct: 2
  },
  {
    question: "100 ÷ 4 = ?",
    options: ["25", "20", "30", "15"],
    correct: 0
  },

  // ===== FOTO 2 =====
  {
    question: "9² = ?",
    options: ["72", "81", "99", "90"],
    correct: 1
  },
  {
    question: "Laut terbesar di dunia?",
    options: ["Laut Jawa", "Laut Mediterania", "Samudra Pasifik", "Atlantik"],
    correct: 2
  },
  {
    question: "45 + 15 = ?",
    options: ["55", "60", "65", "70"],
    correct: 1
  },
  {
    question: "Hewan tercepat di darat?",
    options: ["Kuda", "Singa", "Cheetah", "Harimau"],
    correct: 2
  },
  {
    question: "7 x 8 = ?",
    options: ["54", "56", "58", "64"],
    correct: 1
  },

  // ===== FOTO 3 =====
  {
    question: "Jika semua kucing adalah hewan, apakah semua hewan kucing?",
    options: ["Ya", "Tidak", "Kadang", "Bisa jadi"],
    correct: 1
  },
  {
    question: "50 ÷ 5 = ?",
    options: ["5", "8", "10", "15"],
    correct: 2
  },
  {
    question: "Benua terbesar?",
    options: ["Afrika", "Eropa", "Asia", "Australia"],
    correct: 2
  },
  {
    question: "3 + 7 x 2 = ?",
    options: ["20", "17", "14", "10"],
    correct: 1
  },
  {
    question: "Kalau hari ini Senin, 2 hari lagi hari apa?",
    options: ["Selasa", "Rabu", "Kamis", "Jumat"],
    correct: 1
  }
];

// ================= START =================
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  loadQuestion();
}

// ================= LOAD QUESTION =================
function loadQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("questionCounter").innerText =
    `Soal ${currentQuestion + 1}/15`;

  document.getElementById("photoCounter").innerText =
    `Foto ${Math.floor(currentQuestion / 5)}/3`;

  document.getElementById("progress").style.width =
    ((currentQuestion) / questions.length) * 100 + "%";

  document.getElementById("questionText").innerText =
    q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    optionsDiv.innerHTML += `
      <button class="option-btn" onclick="checkAnswer(${index})">
        ${option}
      </button>
    `;
  });

  document.getElementById("message").innerText = "";
}

// ================= CHECK ANSWER =================
function checkAnswer(selected) {
  const q = questions[currentQuestion];

  if (selected !== q.correct) {
    failGame();
    return;
  }

  currentQuestion++;

  // unlock tiap 5 soal
  if (currentQuestion === 5 || currentQuestion === 10 || currentQuestion === 15) {
    unlockPhoto();
  } else {
    loadQuestion();
  }
}

// ================= UNLOCK FOTO =================
function unlockPhoto() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("photoScreen").style.display = "block";

  const photoIndex = (currentQuestion / 5) - 1;

  const photo = document.getElementById("unlockedPhoto");
  photo.src = photos[photoIndex];
  photo.classList.remove("clear-photo");

  setTimeout(() => {
    photo.classList.add("clear-photo");
  }, 500);
}

// ================= LANJUT =================
function continueGame() {
  document.getElementById("photoScreen").style.display = "none";

  if (currentQuestion >= questions.length) {
    winGame();
    return;
  }

  document.getElementById("gameScreen").style.display = "block";
  loadQuestion();
}

// ================= FAIL =================
function failGame() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("failScreen").style.display = "block";
}

// ================= WIN =================
function winGame() {
  document.getElementById("photoScreen").style.display = "none";
  document.getElementById("winScreen").style.display = "block";
}

// ================= RESET =================
function restartGame() {
  location.reload();
}