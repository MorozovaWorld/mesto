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
  nameInput,
  jobInput,
  userName,
  userInfo,
  popupEdProfSubmitBtn
} from './utils/constants.js';
import UserInfo from './components/UserInfo.js';


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
    });
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardListSelector);

defaultCardList.renderItems();


const userData = new UserInfo({
  userNameSelector: userName,
  userInfoSelector: userInfo,
});

const popupEdProf = new PopupWithForm('.popup_action_edit-profile',
{handleFormSubmit: (formData) => {
  const newUserData = userData.setUserInfo(formData);
},
handleDefaultFormValues: () => {
  const defaultUserData = userData.getUserInfo();

  nameInput.value = defaultUserData.name;
  jobInput.value = defaultUserData.info;

  popupEdProfSubmitBtn.classList.remove('popup__button-submit_disabled');
  popupEdProfSubmitBtn.disabled = false;
}});

popupEdProf.setEventListeners();

popupEdProfOpenBtn.addEventListener('click', () => {
  popupEdProf.open()
});

const popupAddPic = new PopupWithForm('.popup_action_add-picture',
  {handleFormSubmit: (formData) => {
    const newCard = new Card(formData, '.template', (event) => {
      const popupWithImage = new PopupWithImage('.popup_action_enlarge-picture');
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });

    const newCardElement = newCard.generateCard();
    defaultCardList.addItem(newCardElement);
    },
  handleDefaultFormValues: () => {}
  })

popupAddPic.setEventListeners();

popupAddPicOpenBtn.addEventListener('click', () => {
  popupAddPic.open()
});
