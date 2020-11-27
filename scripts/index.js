import { Card } from '../scripts/components/card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import  Section  from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import {
  initialCards,
  cardListSelector,
  popupEdProfOpenBtn,
  popupAddPicOpenBtn,
  formElementEdProf,
  formElementAdPic,
  //nameInput,
  //jobInput,
  nameInputNew,
  jobInputNew,
} from './utils/constants.js';


/* const openEdFrofPopup = () => {
  toggleModal(popupEdProf);
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
  popupEdProfSubmitBtn.classList.remove('popup__button-submit_disabled');
  popupEdProfSubmitBtn.disabled = false;
  hideInputErrors(popupEdProf);
} */

/* const closeEdFrofPopup = () => {
  nameInput.value = "";
  jobInput.value = "";
  //toggleModal(popupEdProf);
} */

/* const openAdPicPopup = () => {
  picNameInput.value = "";
  picLinkInput.value = "";
  toggleModal(popupAddPic);
  hideInputErrors(popupAddPic);
} */


/* const handleFormSubmitAddPicture = (evt) => {
  evt.preventDefault();

  const addPicture = {};
  addPicture.name = picNameInput.value;
  addPicture.link = picLinkInput.value;

  const cardAdded = new Card(addPicture, '.template');
  const cardAddedElement = cardAdded.generateCard();

  cards.prepend(cardAddedElement);

  closeAdPicPopup();
} */

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

popupEdProfOpenBtn.addEventListener('click', () => {
  const popupEdProf = new PopupWithForm('.popup_action_edit-profile',
  {handleFormSubmit: () => { }});

  popupEdProf.open()
});

popupAddPicOpenBtn.addEventListener('click', () => {
  const popupAddPic = new PopupWithForm('.popup_action_add-picture',

  {handleFormSubmit: (formData) => {
    const newCard = new Card(formData, '.template', (event) => {
      const popupWithImage = new PopupWithImage('.popup_action_enlarge-picture');
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });
    const newCardElement = newCard.generateCard();
    defaultCardList.addItem(newCardElement);
    }
  })

  popupAddPic.open()
});
