// Declaração de respostas corretas para cada questão
const correctAnswers = {
    1: 'B',
    2: 'B',
    3: 'interatividade'
};

// Inicialização de variáveis globais
let selectedAnswers = {};
let lives = 3;
let currentQuestionIndex = 1;

// Seção para iniciar o questionário
function startQuiz() {
    document.querySelector('.intro-container').style.display = 'none'; 
    document.querySelector('.container').style.display = 'block'; 
    showInfo(1); 
    resetQuiz();
}

// Seção para se mover nas informações pré-lição
function showInfo(infoNumber) {
    document.querySelectorAll('.info-box').forEach(info => info.style.display = 'none');
    
    document.getElementById(`info${infoNumber}`).style.display = 'block';
}

// Função para resetar o quiz
function resetQuiz() {
    selectedAnswers = {};
    lives = 3;
    document.getElementById('lives-count').textContent = lives; 
}

// Seção para mostrar uma questão específica
function showQuestion(questionNumber) {
    document.querySelectorAll('.info-box').forEach(info => info.style.display = 'none');
    document.querySelectorAll('.question').forEach(q => q.style.display = 'none');

    document.getElementById(`question${questionNumber}`).style.display = 'block';

    document.getElementById('progress-bar').style.display = 'block';

    const totalQuestions = Object.keys(correctAnswers).length;
    document.getElementById('progress').style.width = `${(questionNumber / totalQuestions) * 100}%`;
}

// Seção para selecionar uma opção de resposta
function selectOption(questionNumber, answer) {
    selectedAnswers[questionNumber] = answer;
    const options = document.querySelectorAll(`#question${questionNumber} .option`);
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected'); 
}

// Seção para avançar para a próxima questão
function nextQuestion() {
    if (currentQuestionIndex <= Object.keys(correctAnswers).length) {
        const answer = selectedAnswers[currentQuestionIndex];

        if (answer) {
            if (answer === correctAnswers[currentQuestionIndex]) {
                playCorrectSound(); // Tocar som de resposta correta
                currentQuestionIndex++;
                if (currentQuestionIndex <= Object.keys(correctAnswers).length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    showResults();
                }
            } else {
                handleIncorrectAnswer();
            }
        } else {
            showAlert('Por favor, responda a questão.');
        }
    }
}

// Seção para voltar à questão anterior
function prevQuestion() {
    if (currentQuestionIndex > 1) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

// Seção para lidar com respostas incorretas
function handleIncorrectAnswer() {
    lives--; 
    document.getElementById('lives-count').textContent = lives;  

    if (lives <= 0) {
        showAlert('Você perdeu todas as vidas! Voltando ao menu...');
        setTimeout(() => {
            window.location.href = 'menu.html'; 
        }, 1000); 
    } else {
        showAlert('Resposta incorreta. Tente novamente.', true);
    }
}

// Seção para mostrar ajuda
function showHint(hintText) {
    showAlert(hintText);
}

// Seção para mostrar alertas
function showAlert(message, isError = false) {
    const alertBox = document.getElementById('customAlert');
    const alertText = document.getElementById('alertText');
    alertBox.style.display = 'block';
    alertText.innerText = message; 

    alertBox.style.borderColor = isError ? 'red' : ''; 
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Seção para calcular os acertos
function calculateCorrectAnswers() {
    let correctCount = 0;
    for (const [questionNumber, answer] of Object.entries(selectedAnswers)) {
        if (answer === correctAnswers[questionNumber]) {
            correctCount++;
        }
    }
    return correctCount;
}

// Seção para mostrar a tela de resultados
function showResults() {
    const totalQuestions = Object.keys(correctAnswers).length;
    const correctCount = calculateCorrectAnswers();
    
    document.getElementById('result-summary').innerText = 
        `Você respondeu ${totalQuestions} questões e acertou ${correctCount}.`;

    // Mostra o botão "Finalizar" se o usuário acertar todas as perguntas
    const finishButton = document.getElementById('finish-button');
    finishButton.style.display = (correctCount === totalQuestions) ? 'block' : 'none';

    document.querySelector('.container').style.display = 'none'; 
    document.getElementById('result-container').style.display = 'block'; 
}

// Seção para pular uma questão
function skipQuestion() {
    const correctAnswer = correctAnswers[currentQuestionIndex];
    
    currentQuestionIndex++;
    if (currentQuestionIndex > Object.keys(correctAnswers).length) {
        showResults();
    } else {
        showQuestion(currentQuestionIndex);
    }

    lives--;  // Diminui uma vida ao pular
    document.getElementById('lives-count').textContent = lives; 

    // Mostra a resposta correta ao pular
    showAlert(`Você pulou a questão ${currentQuestionIndex - 1}. A resposta correta era: ${correctAnswer}.`, true);
}

// Seção para reiniciar o quiz
function restartQuiz() {
    document.getElementById('result-container').style.display = 'none'; 
    document.querySelector('.intro-container').style.display = 'block'; 
    resetQuiz();
    currentQuestionIndex = 1; 
}

// Seção para finalizar o quiz e redirecionar para o índice
function finishQuiz() {
    window.location.href = 'index.html'; 
}

function submitQuiz() {
    const questionNumber = 3; 
    const userAnswer = document.getElementById('answer3').value.trim().toLowerCase(); 

    if (userAnswer === correctAnswers[questionNumber].toLowerCase()) {
        selectedAnswers[questionNumber] = userAnswer; 
        showAlert('Resposta correta!'); 
        playCorrectSound(); // Tocar som de resposta correta
        nextQuestion(); 
    } else {
        showAlert('Resposta incorreta. Tente novamente.', true);
    }
}

// Som para acerto da questão
function playCorrectSound() {
    const sound = document.getElementById('correct-sound');
    sound.currentTime = 0; 
    sound.play().catch((error) => {
        console.error("Erro ao tocar o áudio:", error);
    });
}

// Checagem do acerto da questão
function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        playCorrectSound();
        showAlert('Resposta correta!');
    } else {
        showAlert('Resposta incorreta!');
    }
}

// Adicione o evento de clique para o botão (caso necessário)
const button = document.getElementById('someButtonId'); // Altere 'someButtonId' para o ID real do seu botão
button.addEventListener('click', () => {
    playCorrectSound();
});