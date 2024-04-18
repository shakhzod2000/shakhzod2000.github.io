const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const germanBtn = document.querySelector('.german-btn');
const unitPopup = document.querySelector('.unit-popup');
const btnUnit1 = document.querySelector('.btn1');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const optionList = document.querySelector('.option-list');
const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const tryAgain = document.querySelector('.tryAgain-btn');
const goHome = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

startBtn.onclick = () => 
{
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => 
{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

germanBtn.onclick = () => 
{
    popupInfo.classList.remove('active');
    unitPopup.classList.add('active');
    
}

btnUnit1.onclick = () => 
{
    unitPopup.classList.remove('active');
    main.classList.remove('active');
    quizSection.classList.add('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

nextBtn.onclick = () => 
{
    if (questionCount < questions.length - 1)  // -1, weil Array bei 0 anfängt;
    {  
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    }
    else
        showResultBox();
}

tryAgain.onclick = () => 
{
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

goHome.onclick = () => 
{
    resultBox.classList.remove('active');
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
}


// Fragen und Optionen aus dem Array holen
function showQuestions(index) 
{
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    
    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionList.innerHTML = optionTag;
    
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) // .length gibt die Anzahl der Elemente zurück.
        option[i].setAttribute('onclick', 'optionSelected(this)');
}

function optionSelected(answer) 
{
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length; // '.children' gibt alle Kinderelemente eines Elements zurück.
    
    if (userAnswer == correctAnswer) 
    {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else 
    {
        answer.classList.add('incorrect');
        // korrekte Antwort hervorheben
        for (let i = 0; i < allOptions; i++)
            if (optionList.children[i].textContent == correctAnswer)
                optionList.children[i].setAttribute('class', 'option correct');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index) 
{
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} von ${questions.length} Fragen`;
}

function headerScore() 
{
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Spielstand: ${userScore} / ${questions.length}`;
}

function showResultBox() 
{
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Du hast ${userScore} von ${questions.length} Fragen richtig beantwortet.`;
    
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    
    let progress = setInterval(() => 
    {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#5bf846 ${progressStartValue * 3.6}deg, white 0deg)`; // "style" ermöglicht, CSS-Regeln zu setzen oder zu ändern.
        if (progressStartValue == progressEndValue)
            clearInterval(progress);
    }, speed);
}


    
