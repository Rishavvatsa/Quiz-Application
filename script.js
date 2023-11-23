const quizdata = [
  {
    question: "What does HTML stand for?",
    options: [
      { id: "A", text: "Hyper Text Markup Language" },
      { id: "B", text: "Highly Textual Markup Language" },
      { id: "C", text: "Hyperlink and Text Markup Language" },
      { id: "D", text: "Home Tool Markup Language" },
    ],
    correctAnswer: "A",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: [
      { id: "A", text: "<a>" },
      { id: "B", text: "<h1>" },
      { id: "C", text: "<p>" },
      { id: "D", text: "<div>" },
    ],
    correctAnswer: "A",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: [
      { id: "A", text: "<lb>" },
      { id: "B", text: "<break>" },
      { id: "C", text: "<br>" },
      { id: "D", text: "<line>" },
    ],
    correctAnswer: "C",
  },
  {
    question: "What does CSS stand for?",
    options: [
      { id: "A", text: "Counter Style Sheet" },
      { id: "B", text: "Computer Style Sheet" },
      { id: "C", text: "Creative Style Sheet" },
      { id: "D", text: "Cascading Style Sheet" },
    ],
    correctAnswer: "D",
  },
  {
    question: "Which HTML tag is used for creating an ordered list?",
    options: [
      { id: "A", text: "<ol>" },
      { id: "B", text: "<ul>" },
      { id: "C", text: "<li>" },
      { id: "D", text: "<list>" },
    ],
    correctAnswer: "A",
  },
  {
    question: "In HTML, what does the <img> tag stand for?",
    options: [
      { id: "A", text: "Image" },
      { id: "B", text: "Link" },
      { id: "C", text: "Italicize" },
      { id: "D", text: "Indent" },
    ],
    correctAnswer: "A",
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: [
      { id: "A", text: "Defines the main content of the HTML document" },
      { id: "B", text: "Contains metadata about the HTML document" },
      { id: "C", text: "Specifies the body of the HTML document" },
      { id: "D", text: "Creates a header section for the HTML document" },
    ],
    correctAnswer: "B",
  },
  {
    question: "Which HTML tag is used for creating a table?",
    options: [
      { id: "A", text: "<table>" },
      { id: "B", text: "<tr>" },
      { id: "C", text: "<td>" },
      { id: "D", text: "<th>" },
    ],
    correctAnswer: "A",
  },
  {
    question: "How do you create hyperlinks in HTML?",
    options: [
      { id: "A", text: "Using the <a> tag" },
      { id: "B", text: "Using the <link> tag" },
      { id: "C", text: "Using the <button> tag" },
      { id: "D", text: "Using the <img> tag" },
    ],
    correctAnswer: "A",
  },
  {
    question: "What is the purpose of the <div> tag in HTML?",
    options: [
      { id: "A", text: "To group block-level elements together" },
      { id: "B", text: "To create a container for inline elements" },
      { id: "C", text: "To create a heading for a section of  content" },
      { id: "D", text: "To create a paragraph of text" },
    ],
    correctAnswer: "A",
  },
];

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const questionE1 = document.getElementById("question");
const submitbtn = document.getElementById("submitButton");
const radioButtons = document.querySelectorAll(".answer");
let currentquestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  const currentquiz = quizdata[currentquestion];
  questionE1.innerText = currentquiz.question;
  a_text.innerText = currentquiz.options[0].text;
  b_text.innerText = currentquiz.options[1].text;
  c_text.innerText = currentquiz.options[2].text;
  d_text.innerText = currentquiz.options[3].text;
  radioButtons.forEach((radioButton) => {
    radioButton.parentElement.style.backgroundColor = "";
  });
}

function getSelected() {
  let selectedAnswer = null;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedAnswer = radioButton.id;
    }
  });

  return selectedAnswer;
}

const quiz = document.getElementById("quiz");

submitbtn.addEventListener("click", () => {
  const selectedAnswer = getSelected();

  if (selectedAnswer) {
    const correctAnswer = quizdata[currentquestion].correctAnswer;

    // Change color based on correctness
    radioButtons.forEach((radioButton) => {
      if (radioButton.id === correctAnswer) {
        radioButton.parentElement.style.backgroundColor = "green";
      } else {
        if (radioButton.id === selectedAnswer) {
          radioButton.parentElement.style.backgroundColor = "red";
        }
      }
    });

    if (selectedAnswer === correctAnswer) {
      score++;
    }

    currentquestion++;

    if (currentquestion < quizdata.length) {
      setTimeout(loadQuiz, 1000);
      startQuiz();
    } else {
      quiz.innerHTML = `<div style="text-align:center">
            <h2>Thankyou for Playing Quiz!!</h2>
            <h2>You answered correctly ${score}/${quizdata.length} </h2>
            <button onclick="location.reload()">Reload</button></div>`;
    }

    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  } else {
    alert("Please select an answer before submitting.");
  }
});

const startQuizButton = document.getElementById("startQuizButton");
const stopQuizButton = document.getElementById("stopQuizButton");
const timerValue = document.getElementById("timer-value");
let timerInterval;

startQuizButton.addEventListener("click", startQuiz);
stopQuizButton.addEventListener("click", stopQuiz);

function startQuiz() {
  startQuizButton.style.display = "none";
  stopQuizButton.style.display = "block";

  let countdown = 300;

  loadQuiz();

  // Update the timer every second
  timerInterval = setInterval(() => {
    countdown--;
    timerValue.textContent = countdown;
    if (countdown < 10) {
      timerValue.style.color = "red";
    }
    if (countdown <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Your quiz has ended.");
      stopQuiz();
    }
  }, 1000);
}

function stopQuiz() {
  startQuizButton.style.display = "block";
  stopQuizButton.style.display = "none";

  clearInterval(timerInterval);

  timerValue.textContent = "15";
  timerValue.style.color = "";
  quiz.innerHTML = `<div style="text-align:center">
            <h2>Thankyou for Playing Quiz!!</h2>
            <h2>You answered correctly ${score}/${quizdata.length} </h2>
            <button onclick="location.reload()" id="reload" >Reload</button></div>`;

  
}
