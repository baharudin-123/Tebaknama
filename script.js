let tries = 0;

// GANTI JAWABAN BENER DI SINI
const correctAnswers = ["culung", "ayra"];

const trollMessages = [
  "Salah wlee 😭 coba lagi",
];

function checkAnswer() {
  const input = document
    .getElementById("answer")
    .value
    .toLowerCase()
    .trim();

  if (correctAnswers.includes(input)) {
    document.getElementById("message").innerText =
      "🎉 SELAMAT! Jawaban benar ! Anda berhak mendapatkan hadiah 😂 \n scroll keatas untuk melihat hadiahhnya !";

    document.getElementById("result").style.display = "block";
  } else {
    tries++;
    document.getElementById("tries").innerText =
      "Percobaan: " + tries;

    const randomMessage =
      trollMessages[Math.floor(Math.random() * trollMessages.length)];

    document.getElementById("message").innerText =
      randomMessage;
  }
}