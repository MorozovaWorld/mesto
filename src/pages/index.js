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
  popupEdProfSubmitBtn,
  popupAdPicSubmitBtn,
  PopupWithImageSelector,
  popupEdProfSelector,
  popupAddPicSelector,
  popupSubmitDisabledSelector,
  picNameInput,
  picLinkInput
} from '../scripts/utils/constants.js';


const editProfileFormValidator = new FormValidator(enableValidation, formElementEdProf);
editProfileFormValidator.enableValidation();

const addPicFormValidator = new FormValidator(enableValidation, formElementAdPic);
addPicFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(PopupWithImageSelector);
popupWithImage.setEventListeners();

function makeCard (data) {
  const card = new Card(data, cardSelector, () => {
    popupWithImage.open(data)});

    const cardElement = card.generateCard();

    return cardElement;
}

function selectSubmitBtn (popup, buttonSelector) {
  const submitBtn = popup.querySelector(buttonSelector);
console.log(popup);
  return submitBtn;
}

const defaultCardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const makeNewCard = makeCard(data);
    defaultCardList.addItemDefault(makeNewCard);
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

  popupEdProfSubmitBtn.classList.remove(popupSubmitDisabledSelector);
  popupEdProfSubmitBtn.disabled = false;

  editProfileFormValidator.hideInputError(formElementEdProf, nameInput);
  editProfileFormValidator.hideInputError(formElementEdProf, jobInput);
}});

popupEdProf.setEventListeners();

popupEdProfOpenBtn.addEventListener('click', () => {
  popupEdProf.open();
});

const popupAddPic = new PopupWithForm(popupAddPicSelector,
  {handleFormSubmit: (data) => {
    const makeNewCard = makeCard(data);
    defaultCardList.addItem(makeNewCard);
    },
  handleDefaultFormValues: () => {
    addPicFormValidator.hideInputError(formElementAdPic, picNameInput);
    addPicFormValidator.hideInputError(formElementAdPic, picLinkInput);
  }
  })

popupAddPic.setEventListeners();

popupAddPicOpenBtn.addEventListener('click', () => {
  popupAddPic.open();

  popupAdPicSubmitBtn.classList.add(popupSubmitDisabledSelector);
  popupAdPicSubmitBtn.disabled = true;
  addPicFormValidator.hideInputError(formElementAdPic, formElementAdPic.querySelector(enableValidation.inputSelector));
});
