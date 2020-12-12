import './index.css';

import { Card } from '../scripts/components/card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import  Section  from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Api from '../scripts/components/Api.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';

import {
  enableValidation,
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
  picLinkInput,
  userPic,
  popupWithSubmitSelector,
  popupEditProfilePicSelector,
  editProfPicBtn,
  formElementEditProfPic,
  popupEditProfPicSubmitBtn
} from '../scripts/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  cardsUrl: '/cards',
  usersUrl: '/users',
  userUrl: '/me',
  avatarUrl: '/me/avatar',
  headers: {
    authorization: 'd8cec698-f9c8-49c1-b35b-3f7a71d2233b',
    'Content-Type': 'application/json'
  }
});

let userId = null;

const userProfileData = new UserInfo({
  userName: userName,
  userInfo: userInfo,
  userPic: userPic,
});

const cardList = new Section({
  renderer: (data) => {
    const makeNewCard = makeCard(data);
    cardList.addItemsDefault(makeNewCard);
  }
}, cardListSelector);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
])
  .then(([userData, initialCardsData]) => {
    userProfileData.setUserInfo(userData);
    userProfileData.setUserPic(userData);

    userId = userData._id;

    cardList.renderItems(initialCardsData);
  })
  .catch((err) => console.log(err));

const popupDeleteSubmit = new PopupWithSubmit(popupWithSubmitSelector);
popupDeleteSubmit.setEventListeners();

function makeCard (data) {
  const card = new Card(data, cardSelector, {
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    handleCardDelete: (cardId) => {
      popupDeleteSubmit.setSubmitAction(() => {
        api.deleteCard(cardId)
        .then(res => card.removeCard())
        .then(popupDeleteSubmit.close())
        .catch((err) => console.log(err));
      });

      popupDeleteSubmit.open(data);
    },
    handleCardLike: () => {
      api.likeCard(data)
        .then((res) => {
          card.updateLikes(res.likes);
      })
    },
    handleCardUnlike: () => {
      api.unlikeCard(data)
        .then((res) => {
          card.updateLikes(res.likes);
      })
    },
    userId: userId
  });

  const cardElement = card.generateCard();

  return cardElement;
}

const popupWithImage = new PopupWithImage(PopupWithImageSelector);
popupWithImage.setEventListeners();

const popupEdProf = new PopupWithForm(popupEdProfSelector,
  {handleFormSubmit: (formData) => {
      popupEdProfSubmitBtn.textContent = 'Сохранение...';

      api.editUserInfo(formData)
        .then((newUserData) => {
          userProfileData.setUserInfo(newUserData);
        })
        .then(popupEdProf.close())
        .catch((err) => console.log(err))
        .finally(() => {popupEdProfSubmitBtn.textContent = 'Сохранить'})
      },
  handleDefaultFormValues: () => {
      const defaultUserData = userProfileData.getUserInfo();

      nameInput.value = defaultUserData.name;
      jobInput.value = defaultUserData.info;

      editProfileFormValidator.enabledSubmitBtn(popupSubmitDisabledSelector);

      editProfileFormValidator.hideInputError(nameInput);
      editProfileFormValidator.hideInputError(jobInput);
    }
  });

const editProfileFormValidator = new FormValidator(enableValidation, formElementEdProf);
editProfileFormValidator.enableValidation();

popupEdProfOpenBtn.addEventListener('click', () => {
  popupEdProf.open();
});

popupEdProf.setEventListeners();


const popupAddPic = new PopupWithForm(popupAddPicSelector,
  {handleFormSubmit: (data) => {
    popupAdPicSubmitBtn.textContent = 'Сохранение...';
    api.addCard(data)
      .then((cardElement) => {
        const makeNewCard = makeCard(cardElement);
        return makeNewCard
      })
      .then((card) => {
        cardList.addItem(card);
      })
      .then(popupAddPic.close())
      .catch((err) => console.log(err))
      .finally(() => {popupAdPicSubmitBtn.textContent = 'Создать'})
    },
  handleDefaultFormValues: () => {
      addPicFormValidator.hideInputError(picNameInput);
      addPicFormValidator.hideInputError(picLinkInput);
      addPicFormValidator.hideInputError(formElementAdPic.querySelector(enableValidation.inputSelector));
    }
  })

const addPicFormValidator = new FormValidator(enableValidation, formElementAdPic);
addPicFormValidator.enableValidation();

popupAddPicOpenBtn.addEventListener('click', () => {
  popupAddPic.open();
  addPicFormValidator.disableSubmitBtn(popupSubmitDisabledSelector);
});

popupAddPic.setEventListeners();


const popupEditProfilePic = new PopupWithForm(popupEditProfilePicSelector, {
  handleFormSubmit: (formData) => {
    popupEditProfPicSubmitBtn.textContent = 'Сохранение...';
    const newPic = api.editUserPic(formData);
    newPic
      .then((data) => {
        userProfileData.setUserPic(data);
      })
      .catch((err) => console.log(err))
      .then(popupEditProfilePic.close())
      .finally(() => {popupEditProfPicSubmitBtn.textContent = 'Сохранить'})
    },
  handleDefaultFormValues: () => {
      editProfPicFormValidator.hideInputError(formElementEditProfPic.querySelector(enableValidation.inputSelector));
    }
})

const editProfPicFormValidator = new FormValidator(enableValidation, formElementEditProfPic);
editProfPicFormValidator.enableValidation();

editProfPicBtn.addEventListener('click', () => {
  popupEditProfilePic.open();
  editProfPicFormValidator.disableSubmitBtn(popupSubmitDisabledSelector);
})

popupEditProfilePic.setEventListeners();
