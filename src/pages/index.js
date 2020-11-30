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

popupEdProfOpenBtn.addEventListener('click', () => {
  popupEdProf.open()
});

const popupAddPic = new PopupWithForm(popupAddPicSelector,
  {handleFormSubmit: (formData) => {
    const newCard = new Card(formData, cardSelector, (event) => {
      const popupWithImage = new PopupWithImage(PopupWithImageSelector);
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });

    const newCardElement = newCard.generateCard();
    defaultCardList.addItem(newCardElement);
    },
  handleDefaultFormValues: () => {
  }
  })

popupAddPic.setEventListeners();

popupAddPicOpenBtn.addEventListener('click', () => {
  popupAddPic.open()
});
