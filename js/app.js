// Services
import { checkUser, createUser } from '../services/user-service.js';

// DOM
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Submits buttons
const sign_in_submit = document.querySelector("#sign_in_submit");
const sign_up_submit = document.querySelector("#sign_up_submit");

// Inputs
const sign_in_email = document.querySelector("#sign_in_email");
const sign_in_password = document.querySelector("#sign_in_password");

const sign_up_username = document.querySelector("#sign_up_username");
const sign_up_email = document.querySelector("#sign_up_email");
const sign_up_password = document.querySelector("#sign_up_password");

//

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode");
});

sign_in_submit.addEventListener('click', (evt) => {
    evt.preventDefault();

    const inputsData = {
        email: sign_in_email.value,
        password: sign_in_password.value,
    };

    return checkUser(inputsData)
        .then((_res) => {
            alert('Login concluído'); 
            window.location.href = 'index.html'; 
        })
        .catch((err) => {
            alert(err.message); 
        });
});

sign_up_submit.addEventListener('click', (evt) => {
    evt.preventDefault();

    const inputsData = {
        nome: sign_up_username.value,
        email: sign_up_email.value,
        password: sign_up_password.value,
    };

    return createUser(inputsData)
        .then((res) => alert(res.message))
        .catch((err) => alert(err.message));
});
