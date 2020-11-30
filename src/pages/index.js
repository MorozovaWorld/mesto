import './index.css';

import { Card } from '../scripts/components/card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import  Section  from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import {
  enableValidation,
  initialCards,
  cardListSelector,
  cardSelector,
  popupEdProfOpenBtn,
  popupAddPicOpenBtn,
  formElementEdProf,
  formElementAdPic,
<<<<<<< HEAD:scripts/index.js
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
=======
  nameInput,
  jobInput,
  userName,
  userInfo,
  popupSubmitBtn,
  PopupWithImageSelector,
  popupEdProfSelector,
  popupAddPicSelector,
  popupSubmitDisabledSelector
} from '../scripts/utils/constants.js';

>>>>>>> refactoringEightProject:src/pages/index.js

const editProfileFormValidator = new FormValidator(enableValidation, formElementEdProf);
editProfileFormValidator.enableValidation();

const addPicFormValidator = new FormValidator(enableValidation, formElementAdPic);
addPicFormValidator.enableValidation();

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardSelector, (event) => {
      const popupWithImage = new PopupWithImage(PopupWithImageSelector);
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    defaultCardList.addItemDefault(cardElement);
  }
}, cardListSelector);

defaultCardList.renderItems();

<<<<<<< HEAD:scripts/index.js
=======

const userData = new UserInfo({
  userNameSelector: userName,
  userInfoSelector: userInfo,
});

const popupEdProf = new PopupWithForm(popupEdProfSelector,
{handleFormSubmit: (formData) => {
  const newUserData = userData.setUserInfo(formData);
},
handleDefaultFormValues: () => {
  const defaultUserData = userData.getUserInfo();

  nameInput.value = defaultUserData.name;
  jobInput.value = defaultUserData.info;

  popupSubmitBtn.classList.remove(popupSubmitDisabledSelector);
  popupSubmitBtn.disabled = false;
}});

popupEdProf.setEventListeners();

>>>>>>> refactoringEightProject:src/pages/index.js
popupEdProfOpenBtn.addEventListener('click', () => {
  const popupEdProf = new PopupWithForm('.popup_action_edit-profile',
  {handleFormSubmit: () => { }});

  popupEdProf.open()
});

<<<<<<< HEAD:scripts/index.js
popupAddPicOpenBtn.addEventListener('click', () => {
  const popupAddPic = new PopupWithForm('.popup_action_add-picture',

=======
const popupAddPic = new PopupWithForm(popupAddPicSelector,
>>>>>>> refactoringEightProject:src/pages/index.js
  {handleFormSubmit: (formData) => {
    const newCard = new Card(formData, cardSelector, (event) => {
      const popupWithImage = new PopupWithImage(PopupWithImageSelector);
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });
    const newCardElement = newCard.generateCard();
    defaultCardList.addItem(newCardElement);
<<<<<<< HEAD:scripts/index.js
    }
=======
    },
  handleDefaultFormValues: () => {
  }
>>>>>>> refactoringEightProject:src/pages/index.js
  })

  popupAddPic.open()
});
