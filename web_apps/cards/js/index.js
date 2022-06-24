const tg = window.Telegram.WebApp;
const cardTypesForm = document.querySelector('.card-types-form');
const debitCardForm = document.querySelector('.debet-cards-form');
const creditCardForm = document.querySelector('.credit-cards-form');
const cardTypes = document.querySelectorAll('.card-type-item');
const cards = document.querySelectorAll('.card-item');

function displayForm(form) {
    [cardTypesForm, debitCardForm, creditCardForm].map(item => hideForm(item))
    showForm(form)
}

function showForm(form) {
    form.classList.remove('hidden');
}

function hideForm(form) {
    form.classList.add('hidden');
}

function selectCardType(e) {
    const type = e.currentTarget.getAttribute('data-type')
    if (type === 'credit') {
        displayForm(creditCardForm)
    }
    if (type === 'debit') {
        displayForm(debitCardForm)
    }
}

function selectCard(e) {
    const type = e.currentTarget.getAttribute('data-type');
    const title = e.currentTarget.getAttribute('data-title');
    const data = JSON.stringify({ action: 'select-card', type, title })
    tg.sendData(data)
}

cardTypes.forEach(card => {
    card.addEventListener('click', selectCardType);
})

cards.forEach(card => {
    card.addEventListener('click', selectCard);
})

function setSchema(schema) {
    const body = document.querySelector('body');
    body.classList.add(schema)
}
setSchema(tg.colorScheme);