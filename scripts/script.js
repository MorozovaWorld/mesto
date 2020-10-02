console.log('Hello world')

let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__popup-button-open');
let popupCloseBtn = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  nameInput.value="";
  jobInput.value="";
  popup.classList.remove('popup_opened');

}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputNew = document.querySelector('.profile__info-title');
    let jobInputNew = document.querySelector('.profile__info-subtitle');

    nameInputNew.textContent = nameInput.value;
    jobInputNew.textContent = jobInput.value;

    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);
