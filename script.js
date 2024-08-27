const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;
let incorrectAnswers = [];

const questions = [
  
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "HyperText Machine Language", correct: false },
      { text: "HighText Markup Language", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "color", correct: false },
      { text: "bgColor", correct: false },
      { text: "background-color", correct: true },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
    ],
  },
  {
    question: "Which of the following is a CSS framework?",
    answers: [
      { text: "Angular", correct: false },
      { text: "Bootstrap", correct: true },
      { text: "React", correct: false },
      { text: "Vue", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<style>", correct: true },
      { text: "<css>", correct: false },
      { text: "<script>", correct: false },
      { text: "<stylesheet>", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which JavaScript method is used to write HTML output?",
    answers: [
      { text: "document.write()", correct: true },
      { text: "console.log()", correct: false },
      { text: "window.print()", correct: false },
      { text: "document.createElement()", correct: false },
    ],
  },
  {
    question: "How can you add a comment in a CSS file?",
    answers: [
      { text: "// this is a comment", correct: false },
      { text: "/* this is a comment */", correct: true },
      { text: "<!-- this is a comment -->", correct: false },
      { text: "' this is a comment", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "style", correct: true },
      { text: "class", correct: false },
      { text: "font", correct: false },
      { text: "styles", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "String", correct: false },
      { text: "Float", correct: true },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Display Object Management", correct: false },
      { text: "Digital Object Model", correct: false },
      { text: "Desktop Object Management", correct: false },
    ],
  },
  {
    question: "Which HTTP status code is returned for a successful request?",
    answers: [
      { text: "200", correct: true },
      { text: "404", correct: false },
      { text: "500", correct: false },
      { text: "403", correct: false },
    ],
  },
  {
    question: "Which keyword is used to declare a JavaScript variable?",
    answers: [
      { text: "var", correct: true },
      { text: "int", correct: false },
      { text: "string", correct: false },
      { text: "let", correct: true },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-size", correct: true },
      { text: "text-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  incorrectAnswers = [];
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    const question = shuffledQuestions[currentQuestionIndex];
    if (question.answers[answerIndex].correct) {
      score++;
    } else {
      incorrectAnswers.push({
        question: question.question,
        correctAnswer: question.answers.find(answer => answer.correct).text,
        userAnswer: question.answers[answerIndex].text
      });
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerHTML = `<p>Your final score: ${score} / ${shuffledQuestions.length}</p>`;

  if (incorrectAnswers.length > 0) {
    const incorrectDiv = document.createElement("div");
    incorrectDiv.innerHTML = "<h3>Questions you got wrong:</h3>";
    incorrectAnswers.forEach((item, index) => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>Question ${index + 1}:</strong> ${item.question}<br><strong>Your answer:</strong> ${item.userAnswer}<br><strong>Correct answer:</strong> ${item.correctAnswer}`;
      incorrectDiv.appendChild(p);
    });
    resultDiv.appendChild(incorrectDiv);
  }
}
