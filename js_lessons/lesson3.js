// Declaração de respostas corretas para cada questão
const correctAnswers = {
    1: 'C',
    2: 'D',
    3: 'C',
    4: 'alert'
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
    document.querySelectorAll('.info-box, .question').forEach(el => el.style.display = 'none');

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
                playCorrectSound(); 
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
    playIncorrectSound(); 
    lives--; 
    document.getElementById('lives-count').textContent = lives;  

    if (lives <= 0) {
        showAlert('Você perdeu todas as vidas! Voltando ao menu...');
        setTimeout(() => {
            window.location.href = '../menu.html'; 
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

    if (correctCount === totalQuestions) {
        showCelebrationGif(); 
    } else {
        playFailSound(); 
    }

    document.querySelector('.container').style.display = 'none'; 
    document.getElementById('result-container').style.display = 'block'; 
    document.getElementById('finish-button').style.display = 'block';
}

// Seção para pular uma questão
function skipQuestion() {
    const correctAnswer = correctAnswers[currentQuestionIndex];
    
    playIncorrectSound(); 
    
    currentQuestionIndex++;
    if (currentQuestionIndex > Object.keys(correctAnswers).length) {
        showResults();
    } else {
        showQuestion(currentQuestionIndex);
    }

    lives--; 
    document.getElementById('lives-count').textContent = lives; 

    showAlert(`Você pulou a questão ${currentQuestionIndex - 1}. A resposta correta era: ${correctAnswer}.`, true);
}

// Seção para reiniciar o quiz
function restartQuiz() {
    currentQuestionIndex = 1;
    lives = 3;
    selectedAnswers = {};

    document.getElementById('lives-count').textContent = lives;
    document.getElementById('progress').style.width = '0%';

    document.querySelectorAll('.question, .info-box, #result-container').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelector('.intro-container').style.display = 'block'; 
    showInfo(1);
}

// Seção para finalizar o quiz e redirecionar para o índice
function finishQuiz() {
    window.location.href = '../menu.html'; 
}

// Função para submeter a resposta do usuário na questão 3
function submitQuiz() {
    const questionNumber = 4; 
    const userAnswer = document.getElementById('answer4').value.trim().toLowerCase(); 

    if (userAnswer === correctAnswers[questionNumber].toLowerCase()) {
        selectedAnswers[questionNumber] = userAnswer; 
        showAlert('Resposta correta!'); 
        playCorrectSound(); 
        nextQuestion(); 
    } else {
        showAlert('Resposta incorreta. Tente novamente.', true);
        playIncorrectSound(); 
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

// Som para falha da questão
function playIncorrectSound() {
    const sound = document.getElementById('incorrect-sound');
    sound.currentTime = 0; 
    sound.play().catch((error) => {
        console.error("Erro ao tocar o áudio:", error);
    });
}

// Som para conclusão da lição
function playCelebrationSound() {
    const celebrationSound = document.getElementById('win-sound');
    celebrationSound.currentTime = 0; 
    celebrationSound.play().catch((error) => {
        console.error("Erro ao tocar o áudio de celebração:", error);
    });
}

// Som para conclusão incorreta da lição
function playFailSound() {
    const failSound = document.getElementById('fail-sound');
    failSound.currentTime = 0; 
    failSound.play().catch((error) => {
        console.error("Erro ao tocar o áudio de falha:", error);
    });
}

// Checagem do acerto da questão
function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        playCorrectSound();
        showAlert('Resposta correta!');
    } else {
        playIncorrectSound();
        showAlert('Resposta incorreta!');
    }
}

// Função para exibir o GIF de celebração
function showCelebrationGif() {
    const gif = document.getElementById('celebration-gif');
    gif.style.display = 'block';

    playCelebrationSound();

    setTimeout(() => {
        gif.style.display = 'none';
    }, 5000);
}

// Exibição da imagem em tela cheia
document.querySelectorAll('.info-box img').forEach(img => {
    img.addEventListener('click', function(event) {
        document.querySelectorAll('.info-box img').forEach(i => i.classList.remove('active'));
        this.classList.toggle('active');
        event.stopPropagation(); 
    });
});

document.addEventListener('click', function(event) {
    const activeImage = document.querySelector('.info-box img.active');
    if (activeImage && !activeImage.contains(event.target)) {
        activeImage.classList.remove('active');
    }
});

// Tooltip para explicar palavras novas
function mostrarSignificado(elemento) {
    const significado = elemento.nextElementSibling.getAttribute('data-significado');
    document.getElementById("significadoTexto").innerText = significado;
    document.getElementById("meuModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("meuModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("meuModal")) {
        fecharModal();
    }
}

// Para exibir o alerta
function exibirAlerta() {
    const codigo = document.getElementById("answer_alert").value;

    const match = codigo.match(/alert\(["'](.+)["']\)/);
    
    if (match) {
        alert(match[1]);
    } else {
        alert("Por favor, use o formato alert(\"Conteúdo\")");
    }
}
