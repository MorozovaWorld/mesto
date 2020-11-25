export const popupEdProf = document.querySelector('.popup_action_edit-profile');
export const popupAddPic = document.querySelector('.popup_action_add-picture');
export const popupEdProfOpenBtn = document.querySelector('.profile__popup-button-open');
export const popupAddPicOpenBtn = document.querySelector('.addpic-popup-button-open');
export const popupEdProfCloseBtn = popupEdProf.querySelector('.popup__close');
export const popupEdProfSubmitBtn = popupEdProf.querySelector('.popup__button-submit');
export const popupAddPicCloseBtn = popupAddPic.querySelector('.popup__close');
export const formElementEdProf = popupEdProf.querySelector('.popup__form_action_edit-profile');
export const formElementAdPic = popupAddPic.querySelector('.popup__form_action_add-picture');
export const nameInput = formElementEdProf.querySelector('#name');
export const jobInput = formElementEdProf.querySelector('#job');
export const picNameInput = formElementAdPic.querySelector('#picName');
export const picLinkInput = formElementAdPic.querySelector('#picLink');
export const nameInputNew = document.querySelector('.profile__info-title');
export const jobInputNew = document.querySelector('.profile__info-subtitle');
export const cards = document.querySelector('.cards');
export const cardListSelector = '.cards';

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

