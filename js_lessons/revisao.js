const blanks = document.querySelectorAll(".blank");
const options = document.querySelectorAll(".option");

options.forEach(option => {
  option.addEventListener("dragstart", dragStart);
});

blanks.forEach(blank => {
  blank.addEventListener("dragover", dragOver);
  blank.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.textContent);
  event.target.classList.add("dragging");
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  const draggedLetter = event.dataTransfer.getData("text");
  const draggingElement = document.querySelector(".dragging");

  // Verifica se o espaço já está preenchido
  if (event.target.textContent) return;

  // Coloca a letra na célula
  event.target.textContent = draggedLetter;

  // Verifica se a letra é a correta
  if (draggedLetter === event.target.dataset.correct) {
    event.target.classList.add("correct");
    event.target.setAttribute("contenteditable", "false"); 
    draggingElement.remove(); 
  } else {
    event.target.textContent = ""; 
    showAlert("Letra incorreta! Tente novamente.", true); 
  }

  // Remove a classe de arraste depois de soltar
  draggingElement.classList.remove("dragging");
}

function checkAnswer() {
  let correct = true;

  blanks.forEach(blank => {
    if (blank.textContent !== blank.dataset.correct) {
      correct = false;
    }
  });

  const result = document.getElementById("result");
  if (correct) {
    playCelebrationSound();
    console.log("Usuário acertou!");
    result.textContent = "Parabéns! Você acertou! Redirecionando...";
    result.style.color = "green";
    
    setTimeout(() => {
      console.log("Redirecionando para menu.html...");
      window.location.href = "../menu.html";
    }, 5000);
  }
}

function clearBlanks() {
  blanks.forEach(blank => {
    if (!blank.classList.contains("correct")) {
      blank.textContent = "";
    }
  });
}

// Função para mostrar alertas personalizados
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

function playCelebrationSound() {
  const celebrationSound = document.getElementById('win-sound');
  celebrationSound.currentTime = 0; 
  celebrationSound.play().catch((error) => {
      console.error("Erro ao tocar o áudio de celebração:", error);
  });
}