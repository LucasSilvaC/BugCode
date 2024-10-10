// Declaração de respostas corretas para cada questão
const correctAnswers = {
    1: 'b',             
    2: 'b',              
    3: 'interatividade'   
};

// Inicialização de variáveis globais
let selectedAnswers = {};
let lives = 3;  

// Seção para iniciar o questionário
function startQuiz() {
    document.querySelector('.intro-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    showInfo(1);
}

// Seção para mostrar informações
function showInfo(infoNumber) {
    document.querySelectorAll('.info-box').forEach(info => info.style.display = 'none');
    document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
    document.getElementById('progress').style.width = '0%';
    document.getElementById('progress-bar').style.display = 'none';
    document.getElementById(`info${infoNumber}`).style.display = 'block';
}

// Seção para mostrar uma questão específica
function showQuestion(questionNumber) {
    document.querySelectorAll('.info-box').forEach(info => info.style.display = 'none');
    document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
    document.getElementById('progress').style.width = '0%';

    document.getElementById(`question${questionNumber}`).style.display = 'block';
    document.getElementById('progress-bar').style.display = 'block';
    document.getElementById('progress').style.width = `${(questionNumber / 3) * 100}%`;
}

// Seção para selecionar uma opção de resposta
function selectOption(questionNumber, answer) {
    selectedAnswers[questionNumber] = answer;
    const options = document.querySelectorAll(`#question${questionNumber} .option`);
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Seção para avançar para a próxima questão
function nextQuestion(currentQuestion) {
    const answer = selectedAnswers[currentQuestion];

    if (answer) {
        if (answer === correctAnswers[currentQuestion]) {
            showQuestion(currentQuestion + 1);
        } else {
            handleIncorrectAnswer();
        }
    } else {
        showAlert('Por favor, responda a questão.');
    }
}

// Seção para voltar à questão anterior
function prevQuestion(currentQuestion) {
    showQuestion(currentQuestion - 1);
}

// Seção para enviar a resposta da questão
function submitAnswer(questionNumber) {
    const userAnswer = document.getElementById('answer' + questionNumber).value.trim();
    
    if (userAnswer.toLowerCase() === correctAnswers[questionNumber].toLowerCase()) {
        showAlert('Resposta correta para a questão ' + questionNumber + '!');
        if (questionNumber < 3) {
            showQuestion(questionNumber + 1);
        } else {
            showAlert('Quiz completo!'); 
        }
    } else {
        handleIncorrectAnswer();
    }
}

// Seção para lidar com respostas incorretas
function handleIncorrectAnswer() {
    lives--;  // Diminui uma vida
    document.getElementById('lives-count').textContent = lives;  

    if (lives <= 0) {
        showAlert('Você perdeu todas as vidas! Voltando ao menu...');
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1000); 
    } else {
        showAlert('Resposta incorreta. Tente novamente.');
    }
}

// Seção para mostrar alertas
function showAlert(message) {
    document.getElementById('alertText').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
}

// Seção para fechar o alerta
function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Seção para pular uma questão
function skipQuestion(currentQuestion) {
    showQuestion(currentQuestion + 1);
}

// Seção para mostrar dicas
function showHint(hint) {
    showAlert(hint);
}