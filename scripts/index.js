const popupEdProf = document.querySelector('.popup_action_edit-profile');
const popupAddPic = document.querySelector('.popup_action_add-picture');
const popupEnlargePic = document.querySelector('.popup_action_enlarge-picture');
const popupEdProfOpenBtn = document.querySelector('.profile__popup-button-open');
const popupAddPicOpenBtn = document.querySelector('.addpic-popup-button-open');
const popupEdProfCloseBtn = popupEdProf.querySelector('.popup__close');
const picPopupCloseBtn = popupEnlargePic.querySelector('.popup__close_position_picture-popup');
const pictureEnlarged = popupEnlargePic.querySelector('.popup__picture-enlarged');
const caption = popupEnlargePic.querySelector('.popup__picture-caption');
const popupEdProfSubmitBtn = popupEdProf.querySelector('.popup__button-submit');
const popupAddPicCloseBtn = popupAddPic.querySelector('.popup__close');
const formElementEdProf = popupEdProf.querySelector('.popup__form_action_edit-profile');
const formElementAdPic = popupAddPic.querySelector('.popup__form_action_add-picture');
const nameInput = formElementEdProf.querySelector('#name');
const jobInput = formElementEdProf.querySelector('#job');
const picNameInput = formElementAdPic.querySelector('#picName');
const picLinkInput = formElementAdPic.querySelector('#picLink');
const nameInputNew = document.querySelector('.profile__info-title');
const jobInputNew = document.querySelector('.profile__info-subtitle');
const cards = document.querySelector('.cards');
const template = document.querySelector('.template');


const toggleModal = (modal) => {
  modal.classList.toggle('popup_opened');
  if (modal.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closePopupByEscBtn);
  }
  else {document.removeEventListener('keydown', closePopupByEscBtn)};
}

const closePopupByBackground = () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target !== event.currentTarget) {
        return
      }
      toggleModal(popup);
    });
  });
}

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
};

const hideInputErrors = (popupWithErrors) => {
  const inputErrors = Array.from(popupWithErrors.querySelectorAll('.popup__input-error'));
  inputErrors.forEach((error) => {
    error.textContent = '';
  });
  const inputsWithErrors = Array.from(popupWithErrors.querySelectorAll('.popup__input-text'));
  inputsWithErrors.forEach((errorInput) => {
    errorInput.classList.remove('popup__input-text_type_error');
  });
}

const openEdFrofPopup = () => {
  toggleModal(popupEdProf);
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
  popupEdProfSubmitBtn.classList.remove('popup__button-submit_disabled');
  popupEdProfSubmitBtn.disabled = false;
  hideInputErrors(popupEdProf);
}

const closeEdFrofPopup = () => {
  nameInput.value = "";
  jobInput.value = "";
  toggleModal(popupEdProf);
}

const openAdPicPopup = () => {
  picNameInput.value = "";
  picLinkInput.value = "";
  toggleModal(popupAddPic);
  hideInputErrors(popupAddPic);
}

const closeAdPicPopup = () => {
  toggleModal(popupAddPic);
}

popupEdProfOpenBtn.addEventListener('click', openEdFrofPopup);
popupEdProfCloseBtn.addEventListener('click', closeEdFrofPopup);

popupAddPicOpenBtn.addEventListener('click', openAdPicPopup);
popupAddPicCloseBtn.addEventListener('click', closeAdPicPopup);

const handleFormSubmitEditProfile = (evt) => {
    evt.preventDefault();

    nameInputNew.textContent = nameInput.value;
    jobInputNew.textContent = jobInput.value;

    closeEdFrofPopup();
}

const handleFormSubmitAddPicture = (evt) => {
  evt.preventDefault();

  const addPicture = {};
  addPicture['name'] = picNameInput.value;
  addPicture['link'] = picLinkInput.value;

  cards.prepend(createItem(addPicture));

  closeAdPicPopup();
}

formElementEdProf.addEventListener('submit', handleFormSubmitEditProfile);
formElementAdPic.addEventListener('submit', handleFormSubmitAddPicture);

const initialCards = [
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

const renderCards = () => {
    const items = initialCards.map(element => createItem(element));
    cards.append(...items);
};

const handleRemove = (event) => {
  event.target.closest('.card').remove();
};

const handleLike = (event) => {
  const evtTarget = event.target;
  evtTarget.classList.toggle('card__like-icon_status_clicked');
};

const handlePicPopupClose = (event) => {
  toggleModal(popupEnlargePic);
}

const handlePicture = (event) => {
  toggleModal(popupEnlargePic);

  pictureEnlarged.setAttribute('src', event.target.getAttribute('src'));
  caption.textContent = event.target.nextElementSibling.firstElementChild.textContent;
}

picPopupCloseBtn.addEventListener('click', handlePicPopupClose);

const createItem = (element) => {
    const card = template.content.cloneNode(true);
    const removeButton = card.querySelector('.card__delete');
    const likeButton = card.querySelector('.card__like-icon');
    const picture = card.querySelector('.card__img');

    const cardText = card.querySelector('.card__caption-text');

    cardText.textContent = element.name;
    picture.src = element.link;
    picture.alt = element.name;

    removeButton.addEventListener('click', handleRemove);
    likeButton.addEventListener('click', handleLike);
    picture.addEventListener('click', handlePicture);

    return card;
};

renderCards();
closePopupByBackground();
