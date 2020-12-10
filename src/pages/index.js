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
  likesCounterSelector,
  cardInactiveLikeSelector,
  cardActiveLikeSelector,
  popupEditProfilePicSelector,
  editProfPicBtn,
  formElementEditProfPic,
  popupEditProfPicSubmitBtn
} from '../scripts/utils/constants.js';


const editProfileFormValidator = new FormValidator(enableValidation, formElementEdProf);
editProfileFormValidator.enableValidation();

const addPicFormValidator = new FormValidator(enableValidation, formElementAdPic);
addPicFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(PopupWithImageSelector);
popupWithImage.setEventListeners();

const editProfPicFormValidator = new FormValidator(enableValidation, formElementEditProfPic);
editProfPicFormValidator.enableValidation();

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

const initialUserInfo = api.getUserInfo();
initialUserInfo
  .then((user) => {
    userName.textContent = user.name;
    userInfo.textContent = user.about;
    userPic.src = user.avatar;

    userId = user._id;
  })
  .catch((err) => console.log(err));

const cardList = new Section({
  renderer: (data) => {
    const makeNewCard = makeCard(data);
    cardList.addItemsDefault(makeNewCard);
  }
}, cardListSelector);

const renderCards = api.getInitialCards();
  renderCards
    .then((data) => {
      cardList.renderItems(data);
  })
    .catch((err) => console.log(err));

const popupDeleteSubmit = new PopupWithSubmit(popupWithSubmitSelector, {
  handleFormSubmit: ({data, cardElement}) => {
    api.deleteCard(data._id)
    .then(cardElement.remove())
    .catch((err) => console.log(err));
  }
});

function makeCard (data) {
  const card = new Card(data, cardSelector, {
    handleCardClick: () => {
      popupWithImage.open(data)
    },
    handleCardDelete: (cardElement) => {
      popupDeleteSubmit.open(data);
      popupDeleteSubmit.setEventListeners({data, cardElement});
    },
    handleCardLike: () => {
      api.likeCard(data)
        .then((res) => {
          const likesCounter = cardElement.querySelector(likesCounterSelector); //переделать
          likesCounter.textContent = res.likes.length;
          card.updateLikes(res.likes);
      })
    },
    handleCardUnlike: () => {
      api.unlikeCard(data)
        .then((res) => {
          const likesCounter = cardElement.querySelector(likesCounterSelector); //переделать
          likesCounter.textContent = res.likes.length;
          card.updateLikes(res.likes);
      })
    },
    userId: userId
  });

  const cardElement = card.generateCard();

  return cardElement;
}

const userData = new UserInfo({
  userNameSelector: userName,
  userInfoSelector: userInfo,
  userPicSelector: userPic,
});

const popupEdProf = new PopupWithForm(popupEdProfSelector,
  {handleFormSubmit: (formData) => {
      api.editUserInfo(formData)
        .then((newUserData) => {
          userData.setUserInfo(newUserData);
        })
        .catch((err) => console.log(err));
      },
  handleDefaultFormValues: () => {
      const defaultUserData = userData.getUserInfo();

      nameInput.value = defaultUserData.name;
      jobInput.value = defaultUserData.info;

      popupEdProfSubmitBtn.classList.remove(popupSubmitDisabledSelector);
      popupEdProfSubmitBtn.disabled = false;

      editProfileFormValidator.hideInputError(formElementEdProf, nameInput);
      editProfileFormValidator.hideInputError(formElementEdProf, jobInput);
    }
  });

popupEdProf.setEventListeners();

popupEdProfOpenBtn.addEventListener('click', () => {
  popupEdProf.open();
});


const popupAddPic = new PopupWithForm(popupAddPicSelector,
  {handleFormSubmit: (data) => {
    api.addCard(data)
      .then((cardElement) => {
        const makeNewCard = makeCard(cardElement);
        return makeNewCard
      })
      .then((card) => {
        cardList.addItem(card);
      })
      .catch((err) => console.log(err));
    },
  handleDefaultFormValues: () => {
      addPicFormValidator.hideInputError(formElementAdPic, picNameInput);
      addPicFormValidator.hideInputError(formElementAdPic, picLinkInput);
      addPicFormValidator.hideInputError(formElementAdPic, formElementAdPic.querySelector(enableValidation.inputSelector));
    }
  })

popupAddPicOpenBtn.addEventListener('click', () => {
  popupAddPic.open();

  popupAdPicSubmitBtn.classList.add(popupSubmitDisabledSelector);
  popupAdPicSubmitBtn.disabled = true;
});

popupAddPic.setEventListeners();


const popupEditProfilePic = new PopupWithForm(popupEditProfilePicSelector, {
  handleFormSubmit: (formData) => {
    const newPic = api.editUserPic(formData);
    newPic
      .then((data) => {
        userData.setUserPic(data);
      })
      .catch((err) => console.log(err));
    },
  handleDefaultFormValues: () => {
      editProfPicFormValidator.hideInputError(formElementEditProfPic, formElementEditProfPic.querySelector(enableValidation.inputSelector));
    }
  })

  editProfPicBtn.addEventListener('click', () => {
    popupEditProfilePic.open();

    popupEditProfPicSubmitBtn.classList.add(popupSubmitDisabledSelector);
    popupEditProfPicSubmitBtn.disabled = true;
  })

  popupEditProfilePic.setEventListeners();
