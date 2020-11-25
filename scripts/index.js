import { Card } from '../scripts/components/card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import  Section  from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import {
  initialCards,
  cardListSelector,
  popupEdProfOpenBtn,
  popupEdProfCloseBtn,
  popupAddPicOpenBtn,
  popupAddPicCloseBtn,
  formElementEdProf,
  formElementAdPic,
  nameInput,
  jobInput,
  nameInputNew,
  jobInputNew,
} from './utils/constants.js';

/* export const closePopupByBackground = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target !== event.currentTarget) {
        return
      }
      toggleModal(popup);
    });
  });
} */
/*
const closePopupByEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup.classList.contains('popup_action_edit-profile')) {
        closeEdFrofPopup();
      }
      if (openedPopup.classList.contains('popup_action_add-picture')) {
        closeAdPicPopup();
      }
      if (openedPopup.classList.contains('popup_action_enlarge-picture')) {
        handlePicPopupClose();
      };
  }
}; */

/* const hideInputErrors = (popupWithErrors) => {
  const inputErrors = Array.from(popupWithErrors.querySelectorAll('.popup__input-error'));
  inputErrors.forEach((error) => {
    error.textContent = '';
  });
  const inputsWithErrors = Array.from(popupWithErrors.querySelectorAll('.popup__input-text'));
  inputsWithErrors.forEach((errorInput) => {
    errorInput.classList.remove('popup__input-text_type_error');
  });
} */

const openEdFrofPopup = () => {
  toggleModal(popupEdProf);
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
  popupEdProfSubmitBtn.classList.remove('popup__button-submit_disabled');
  popupEdProfSubmitBtn.disabled = false;
  hideInputErrors(popupEdProf);
}

/* const closeEdFrofPopup = () => {
  nameInput.value = "";
  jobInput.value = "";
  //toggleModal(popupEdProf);
} */

const openAdPicPopup = () => {
  picNameInput.value = "";
  picLinkInput.value = "";
  toggleModal(popupAddPic);
  hideInputErrors(popupAddPic);
}

/* const closeAdPicPopup = () => {
  toggleModal(popupAddPic);
} */

popupEdProfOpenBtn.addEventListener('click', openEdFrofPopup);

popupAddPicOpenBtn.addEventListener('click', openAdPicPopup);

const handleFormSubmitAddPicture = (evt) => {
  evt.preventDefault();

  const addPicture = {};
  addPicture.name = picNameInput.value;
  addPicture.link = picLinkInput.value;

  const cardAdded = new Card(addPicture, '.template');
  const cardAddedElement = cardAdded.generateCard();

  cards.prepend(cardAddedElement);

  closeAdPicPopup();
}

formElementAdPic.addEventListener('submit', handleFormSubmitAddPicture);

const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: '.popup__input-error'
};

const editProfileFormValidator = new FormValidator(enableValidation, formElementEdProf);
editProfileFormValidator.enableValidation();

const addPicFormValidator = new FormValidator(enableValidation, formElementAdPic);
addPicFormValidator.enableValidation();

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template', (event) => {
      const popupWithImage = new PopupWithImage('.popup_action_enlarge-picture');
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardListSelector);

defaultCardList.renderItems();

const popupEdProf = new PopupWithForm({
  popupSelector: '.popup_action_edit-profile',
  handleFormSubmit: () => {
  nameInputNew.textContent = nameInput.value;
  jobInputNew.textContent = jobInput.value;

  popupEdProf.close();
  }
});
