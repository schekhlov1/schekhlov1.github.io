var tg = window.Telegram.WebApp;
var loginForm = document.querySelector('.login-form');
var verificationForm = document.querySelector('.verification-form');
var controlForm = document.querySelector('.control-form');
var loginButton = document.querySelector('#login-button');
var controlButton = document.querySelector('#control-button');
var verifyButton = document.querySelector('#verify-button');
var verificationCode = document.querySelector('#verification-code')
var cardNum = document.querySelector('#card-num')
var transSum = document.querySelector('#trans-sum')
var visa = document.querySelector('.visa-card')
var mc = document.querySelector('.mc-card')
var successform = document.querySelector('.success-form')

function login() {
    setLoading(loginButton)
    setTimeout(function () {
        hideForm(loginForm)
        showForm(controlForm)
        document.getElementById("controlCardNum").innerHTML = cardNum.value
        document.getElementById("controlSum").innerHTML = transSum.value + ' руб'
    }, 1000)
}

function control() {
    setLoading(controlButton)

    setTimeout(function () {
        hideForm(controlForm)
        showForm(verificationForm)
    }, 1000)
}

function mask(event)
{ event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+___-(__)-___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function(a) { return i < val.length ? val.charAt(i++) || def.charAt(i) : a });
    i = new_value.indexOf("_");
    if (i != -1) { i < 5 && (i = 3); new_value = new_value.slice(0, i) }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g, function(a) { return "\\d{1," + a.length + "}" }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5) this.value = ""
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
            var data = JSON.stringify({ token: '6c10a344-bcd7-4262-8deb-7048cdcb46a5' })
            tg.sendData(data)
        } else {
            setError(verificationForm)
            resetLoading(verifyButton)
        }
        setTimeout(function () {
            hideForm(verificationForm)
            showForm(successform)
        }, 500)
    })
}

function setSchema(schema) {
    const body = document.querySelector('body');
    body.classList.add(schema)
}

setSchema(tg.colorScheme);
cardNum.addEventListener('input', mask, false)
loginButton.addEventListener('click', login);
controlButton.addEventListener('click', control);
verifyButton.addEventListener('click', verify);
