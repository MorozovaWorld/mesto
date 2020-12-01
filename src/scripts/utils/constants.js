export const popupEdProfOpenBtn = document.querySelector('.profile__popup-button-open');
export const popupAddPicOpenBtn = document.querySelector('.addpic-popup-button-open');
export const formElementEdProf = document.querySelector('.popup__form_action_edit-profile');
export const formElementAdPic = document.querySelector('.popup__form_action_add-picture');
export const nameInput = formElementEdProf.querySelector('#name');
export const jobInput = formElementEdProf.querySelector('#job');
export const popupEdProfSubmitBtn = formElementEdProf.querySelector('.popup__button-submit');
export const popupAdPicSubmitBtn = formElementAdPic.querySelector('.popup__button-submit');
export const picNameInput = formElementAdPic.querySelector('#picName');
export const picLinkInput = formElementAdPic.querySelector('#picLink');
export const userName = document.querySelector('.profile__info-title');
export const userInfo = document.querySelector('.profile__info-subtitle');
export const cards = document.querySelector('.cards');
export const cardListSelector = '.cards';
export const cardSelector = '.template';
export const popupSubmitDisabledSelector = 'popup__button-submit_disabled';
export const PopupWithImageSelector = '.popup_action_enlarge-picture';
export const popupEdProfSelector = '.popup_action_edit-profile';
export const popupAddPicSelector = '.popup_action_add-picture';


export const initialCards = [
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

export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: '.popup__input-error'
};
