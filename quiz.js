// AI Kids Quiz - JavaScript Standalone
// Reemplaza las preguntas con el contenido de tu Módulo 1

const quizQuestions = [
    {
        id: 1,
        question: "¿Qué significa 'IA' o 'AI'?",
        options: [
            "Inteligencia Artificial",
            "Internet Avanzado", 
            "Información Automática",
            "Inventos Asombrosos"
        ],
        correctAnswer: 0,
        explanation: "IA significa Inteligencia Artificial, que es la capacidad de las máquinas para pensar y aprender como los humanos."
    },
    {
        id: 2,
        question: "¿Cuál de estos es un ejemplo de Inteligencia Artificial que usas todos los días?",
        options: [
            "Una bicicleta",
            "Un asistente de voz como Siri o Alexa",
            "Un lápiz",
            "Una pelota"
        ],
        correctAnswer: 1,
        explanation: "Los asistentes de voz como Siri o Alexa usan IA para entender lo que dices y responder de manera inteligente."
    },
    {
        id: 3,
        question: "¿Qué pueden hacer las computadoras con Inteligencia Artificial?",
        options: [
            "Solo jugar videojuegos",
            "Aprender y mejorar con el tiempo",
            "Solo mostrar imágenes",
            "Nada especial"
        ],
        correctAnswer: 1,
        explanation: "Una característica importante de la IA es que puede aprender de experiencias pasadas y mejorar su rendimiento con el tiempo."
    },
    {
        id: 4,
        question: "¿En qué se parece la IA al cerebro humano?",
        options: [
            "Ambos pueden procesar información",
            "Ambos son del mismo color",
            "Ambos pesan lo mismo",
            "No se parecen en nada"
        ],
        correctAnswer: 0,
        explanation: "Tanto la IA como el cerebro humano pueden procesar información, aunque de maneras diferentes."
    },
    {
        id: 5,
        question: "¿Por qué es importante aprender sobre Inteligencia Artificial?",
        options: [
            "Para volverse robot",
            "Porque está en todas partes y será parte de nuestro futuro",
            "Para asustar a los amigos",
            "No es importante"
        ],
        correctAnswer: 1,
        explanation: "Es importante aprender sobre IA porque está presente en muchas tecnologías que usamos y será aún más importante en el futuro."
    }
];

// Quiz State
let currentQuestion = 0;
let selectedAnswers = [];
let showResults = false;

// Initialize Quiz
function initQuiz() {
    currentQuestion = 0;
    selectedAnswers = [];
    showResults = false;
    updateQuestion();
    updateProgress();
    updateNavigation();
}

// Update Question Display
function updateQuestion() {
    const question = quizQuestions[currentQuestion];
    document.getElementById('questionTitle').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option-button';
        optionButton.onclick = () => selectAnswer(index);
        
        optionButton.innerHTML = `
            <div class="option-content">
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <span>${option}</span>
            </div>
        `;
        
        // Check if this option is selected
        if (selectedAnswers[currentQuestion] === index) {
            optionButton.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionButton);
    });
}

// Select Answer
function selectAnswer(answerIndex) {
    selectedAnswers[currentQuestion] = answerIndex;
    updateQuestion(); // Refresh to show selection
    updateNavigation();
}

// Update Progress Bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressText').textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    document.getElementById('progressPercentage').textContent = `${Math.round(progress)}%`;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Update Navigation Buttons
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = selectedAnswers[currentQuestion] === undefined;
    
    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.textContent = 'Finalizar';
    } else {
        nextBtn.textContent = 'Siguiente';
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
        updateProgress();
        updateNavigation();
    }
}

// Next Question
function nextQuestion() {
    if (selectedAnswers[currentQuestion] === undefined) return;
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        updateQuestion();
        updateProgress();
        updateNavigation();
    } else {
        showQuizResults();
    }
}

// Show Results
function showQuizResults() {
    showResults = true;
    
    // Hide quiz, show results
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('progressSection').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    document.getElementById('headerSubtitle').textContent = 'Resultados del Quiz - Módulo 1';
    
    // Calculate score
    const score = selectedAnswers.reduce((total, answer, index) => {
        return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Update score display
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = `${score}/${quizQuestions.length}`;
    
    // Add score class based on performance
    scoreDisplay.className = 'score-display ';
    if (score >= 4) {
        scoreDisplay.className += 'score-excellent';
    } else if (score >= 3) {
        scoreDisplay.className += 'score-good';
    } else {
        scoreDisplay.className += 'score-needs-improvement';
    }
    
    document.getElementById('percentageDisplay').textContent = `${percentage}% Correcto`;
    
    // Generate review
    generateQuestionReview(score);
}

// Generate Question Review
function generateQuestionReview(score) {
    const reviewContainer = document.getElementById('questionReview');
    let reviewHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const icon = isCorrect ? '✓' : '✗';
        const iconColor = isCorrect ? 'var(--success)' : 'var(--error)';
        
        reviewHTML += `
            <div class="review-item">
                <div class="review-header">
                    <div class="review-icon" style="color: ${iconColor}; font-size: 24px; font-weight: bold;">${icon}</div>
                    <div style="flex: 1;">
                        <div class="review-question">${index + 1}. ${question.question}</div>
                        <div class="review-answers">
                            <p><strong>Tu respuesta:</strong> 
                                <span class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                                    ${question.options[userAnswer]}
                                </span>
                            </p>
                            ${!isCorrect ? `
                                <p><strong>Respuesta correcta:</strong> 
                                    <span class="correct-answer">${question.options[question.correctAnswer]}</span>
                                </p>
                            ` : ''}
                            ${question.explanation ? `
                                <div class="explanation">
                                    💡 ${question.explanation}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    reviewHTML += `
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="restartQuiz()">
                🔄 Intentar de Nuevo
            </button>
        </div>
    `;
    
    reviewContainer.innerHTML = reviewHTML;
}

// Restart Quiz
function restartQuiz() {
    // Reset state
    currentQuestion = 0;
    selectedAnswers = [];
    showResults = false;
    
    // Show quiz, hide results
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('progressSection').classList.remove('hidden');
    document.getElementById('resultsContainer').classList.add('hidden');
    document.getElementById('headerSubtitle').textContent = 'Quiz Interactivo - Módulo 1';
    
    // Reinitialize
    initQuiz();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    
    // Replace placeholder logo if you have the real logo file
    // document.getElementById('logoPlaceholder').src = 'path/to/your/logo.png';
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (showResults) return;
    
    if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        previousQuestion();
    } else if (e.key === 'ArrowRight' && selectedAnswers[currentQuestion] !== undefined) {
        nextQuestion();
    } else if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < quizQuestions[currentQuestion].options.length) {
            selectAnswer(optionIndex);
        }
    }
});