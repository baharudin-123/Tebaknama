let tries = 0;

// GANTI JAWABAN BENER DI SINI
const correctAnswers = ["culung", "ayra"];

const trollMessages = [
  "Salah wlee 😭 coba lagi",
  "Makhluknya kecewa 👀",
  "Hampir... tapi ngaco 😭",
  "Itu siapa kecoa kali",
  "Otaknya di benerin lagii 😭"
];

function checkAnswer() {
  const input = document
    .getElementById("answer")
    .value
    .toLowerCase()
    .trim();

  if (correctAnswers.includes(input)) {
    document.getElementById("message").innerText =
      "🎉 SELAMAT! Jawaban benar ! Anda berhak tidak mendapatkan apa-apa yeyy 😂";

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