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
var mir = document.querySelector('.mir-card')
var successform = document.querySelector('.success-form')

function login() {
    setLoading(loginButton)
    setTimeout(function () {
        hideForm(loginForm)
        showForm(controlForm)
        document.getElementById("controlCardNum").innerHTML = cardNum.value
        document.getElementById("controlSum").innerHTML = transSum.value
    }, 1000)
}

function control() {
    setLoading(controlButton)

    setTimeout(function () {
        hideForm(controlForm)
        showForm(verificationForm)
    }, 1000)
}

function formatCardCode() {
    var cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join('-') : '';
    this.value = cardCode;
}

function checkLunaAndLogo() {
    if(cardNum.value.split('-').join('').length === 16 && !Luhn(cardNum.value.split('-').join(''))) {
        setError(loginForm)
        resetLoading(loginButton)
    } else if(cardNum.value.split('-').join('').length < 16) {
        resetError(loginForm)
    }
    if(cardNum.value[0] === '4')  {
        showImg(visa)
    } else if (cardNum.value[0] ==='5') {
        showImg(mc)
    } else if (cardNum.value[0] ==='2') {
        showImg(mir)
    }
    if(cardNum.value.length === 0) {
        hideImg(visa)
        hideImg(mc)
        hideImg(mir)
    }
}

function Luhn (card) {
    let checksum = 0;
    const cardnumbers = card.split('').map(Number);

    for (const [index, num] of cardnumbers.entries()) {
        if (index % 2 === 0) {
            let buffer = num * 2;
            buffer > 9 ? checksum += buffer - 9 : checksum += buffer;
        }
        else {
            checksum += num;
        }
    }
    return checksum % 10 === 0 ? true : false;
}


function showImg (img) {
    img.classList.remove('hidden')
}

function hideImg (img) {
    img.classList.add('hidden')
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

// setSchema(tg.colorScheme);
cardNum.addEventListener('input', checkLunaAndLogo)
cardNum.addEventListener('input', formatCardCode, false)
loginButton.addEventListener('click', login);
controlButton.addEventListener('click', control);
verifyButton.addEventListener('click', verify);