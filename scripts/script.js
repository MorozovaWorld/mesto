let popup = document.querySelector('.popup');
let popupOpenBtn = document.querySelector('.profile__popup-button-open');
let popupCloseBtn = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
let nameInputNew = document.querySelector('.profile__info-title');
let jobInputNew = document.querySelector('.profile__info-subtitle');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
}

function popupClose() {
  nameInput.value = "";
  jobInput.value = "";
  popup.classList.remove('popup_opened');

}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameInputNew.textContent = nameInput.value;
    jobInputNew.textContent = jobInput.value;

    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.cards');
const template = document.querySelector('.template');

const renderCards = () => {
    const items = initialCards.map(element => getItems(element));
    cards.append(...items)
};

const handlerRemove = (event) => {
  event.target.closest('.card').remove();
};

const getItems = (element) => {
    const card = template.content.cloneNode(true);
    const removeButton = card.querySelector('.card__delete');

    cardText = card.querySelector('.card__caption-text');
    cardImg = card.querySelector('.card__img');

    cardText.textContent = element['name'];
    cardImg.setAttribute('src', element['link']);

    removeButton.addEventListener('click', handlerRemove);

    return card;
};

renderCards();

