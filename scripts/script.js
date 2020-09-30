let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__popup-button-open');
let popupCloseBtn = document.querySelector('.popup__close');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
