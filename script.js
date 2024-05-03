const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '';
    for (let i = 0; i < questions[index].options.length; i++) {
        optionTag += `<div class="option"><span>${questions[index].options[i]}</span></div>`;
    }

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('click', optionSelected);
    }
}

function optionSelected() {
    let userAnswer = this.textContent.trim();  
    let correctAnswer = questions[questionCount].answer.trim();  

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {  
        this.classList.add('correct'); 
        userScore += 1;
        headerScore();
    } else {
        this.classList.add('incorrect'); 
        for (let i = 0; i < optionList.children.length; i++) {            
            let optionText = optionList.children[i].textContent.trim();  
            if (optionText.toLowerCase() === correctAnswer.toLowerCase()) {  
                optionList.children[i].classList.add('correct');
            }
        }
    }
    for (let i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index}/${questions.length} Suallar`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Xal: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Balınız: ${userScore}/${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressEndValue = userScore / questions.length * 360; //  
    let speed = 20;
    let progressStartValue = 0;

    let progress = setInterval(() => {
        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
            if ((userScore / questions.length) * 100 > 60) {
                 
                showCongratulationsMessage();
            } 
            else{
                showFailureMessage();

            }
            
        }else {
            progressStartValue += 1;
            progressValue.textContent = `${Math.floor(progressStartValue / 360 * 100)}%`;
            circularProgress.style.background = `conic-gradient(#ff8000 ${progressStartValue}deg, rgba(255, 255, 255, .1) ${progressStartValue}deg)`;
        }
    }, speed);
}
function showCongratulationsMessage() {
    const congratulationsMessage = document.createElement('div');
    congratulationsMessage.classList.add('congratulations-message');
    congratulationsMessage.innerHTML = '<div class="congratulation"><span>Təbriklər! Siz kursda iştirak hüququ qazandınız!</span></div>';
    resultBox.appendChild(congratulationsMessage);
}
function showFailureMessage() {
    const failureMessage = document.createElement('div');
    failureMessage.classList.add('failure-message');
    failureMessage.innerHTML = '<div class="failure"><span>Təəssüf ki, balınız kursa qəbul üçün kifayət etmir.</span></div>';
    resultBox.appendChild(failureMessage);
}


 

goHomeBtn.onclick = () => {
    resetQuiz();
}

function resetQuiz() {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    
    const failureMessage = document.querySelector('.failure-message');
    if (failureMessage) {
        failureMessage.remove();
    }
    const congratulationsMessage = document.querySelector('.congratulations-message');
    if (congratulationsMessage) {
        congratulationsMessage.remove();
    }

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
