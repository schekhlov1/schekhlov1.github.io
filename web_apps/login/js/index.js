var tg = window.Telegram.WebApp;
var loginField = document.querySelector('#login');
var passwordField = document.querySelector('#password');
var loginForm = document.querySelector('.login-form');
var verificationForm = document.querySelector('.verification-form');
var loginButton = document.querySelector('#login-button');
var verifyButton = document.querySelector('#verify-button');
var verificationCode = document.querySelector('#verification-code')

function setSchema(schema) {
    const body = document.querySelector('body');
    body.classList.add(schema)
}

function login() {
    const login = loginField.value;
    const password = passwordField.value;
    setLoading(loginButton)
    setTimeout(function () {
        hideForm(loginForm)
        showForm(verificationForm)
    }, 1000)
}

function showForm(form) {
    form.classList.remove('hidden');
}

function hideForm(form) {
    form.classList.add('hidden');
}

function setLoading(button) {
    button.classList.add('loading')
}

function resetLoading(button) {
    button.classList.remove('loading')
}

function setError(form) {
    form.classList.add('error')
}

function resetError(form) {
    form.classList.remove('error')
}

function verify() {
    resetError(verificationForm)
    setLoading(verifyButton)
    setTimeout(function () {
        if (verificationCode.value === '1111') {
            var data = JSON.stringify({ action: 'login', token: '6c10a344-bcd7-4262-8deb-7048cdcb46a5' })
            tg.sendData(data)
        } else {
            setError(verificationForm)
            resetLoading(verifyButton)
        }
    })
}

setSchema(tg.colorScheme);
loginButton.addEventListener('click', login);
verifyButton.addEventListener('click', verify);
