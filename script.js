let currentSubject = '';
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

// HTML elementlarini tanlab olamiz
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');

const subjectTitle = document.getElementById('subject-title');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const finalScore = document.getElementById('final-score');

// Quizni boshlash funksiyasi
function startQuiz(subject) {
    // Alohida .js fayllardagi ma'lumotlar bazasini bir joyga yig'amiz
    const allDatabases = {
        informatika: typeof informatikaDB !== 'undefined' ? informatikaDB : [],
        matematika: typeof matematikaDB !== 'undefined' ? matematikaDB : [],
        tarix: typeof tarixDB !== 'undefined' ? tarixDB : []
    };

    currentSubject = subject;
    currentQuestions = allDatabases[subject];
    
    // Agar savollar yuklanmagan bo'lsa ogohlantirish beramiz
    if (!currentQuestions || currentQuestions.length === 0) {
        alert("Xatolik: Bu fanga oid savollar fayli ulanmagan yoki savollar mavjud emas!");
        return;
    }

    currentIndex = 0;
    score = 0;

    // Ekranni almashtiramiz
    homeScreen.classList.add('hide');
    scoreScreen.classList.add('hide');
    quizScreen.classList.remove('hide');

    let subjectName = subject === 'informatika' ? 'INFORMATIKA' : 
                      subject === 'matematika' ? 'MATEMATIKA' : 'O\'ZBEKISTON VA JAHON TARIXI';

    subjectTitle.innerText = "Fan: " + subjectName + ` (${currentQuestions.length} ta savol)`;
    loadQuestion();
}

// Savolni ekranga chiqarish funksiyasi
function loadQuestion() {
    if (currentIndex >= currentQuestions.length) {
        showScore();
        return;
    }

    let q = currentQuestions[currentIndex];
    questionCounter.innerText = `Savol: ${currentIndex + 1} / ${currentQuestions.length}`;
    scoreDisplay.innerText = `Ball: ${score}`;
    questionText.innerText = q.question;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        let btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, q.answer, btn);
        optionsContainer.appendChild(btn);
    });
}

// Javobni tekshirish funksiyasi
function checkAnswer(selected, correct, buttonElement) {
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        buttonElement.style.backgroundColor = '#10b981';
        buttonElement.style.color = '#ffffff';
        score++;
    } else {
        buttonElement.style.backgroundColor = '#ef4444';
        buttonElement.style.color = '#ffffff';
        allButtons[correct].style.backgroundColor = '#10b981';
        allButtons[correct].style.color = '#ffffff';
    }

    scoreDisplay.innerText = `Ball: ${score}`;

    // Keyingi savolga o'tish taymeri
    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1200);
}

// Yakuniy natijani ko'rsatish
function showScore() {
    quizScreen.classList.add('hide');
    scoreScreen.classList.remove('hide');
    finalScore.innerText = `Siz ${currentQuestions.length} ta savoldan ${score} tasiga to'g'ri javob berdingiz!`;
}

// Bosh sahifaga qaytish
function goHome() {
    scoreScreen.classList.add('hide');
    homeScreen.classList.remove('hide');
}