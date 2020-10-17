
let popupEdProf = document.querySelector('.popup_action_edit-profile');
let popupAddPic = document.querySelector('.popup_action_add-picture');
let popupEdProfOpenBtn = document.querySelector('.profile__popup-button-open');
let popupAddPicOpenBtn = document.querySelector('.addpic-popup-button-open');
let popupEdProfCloseBtn = popupEdProf.querySelector('.popup__close');
let popupAddPicCloseBtn = popupAddPic.querySelector('.popup__close');
let formElementEdProf = popupEdProf.querySelector('.popup__form_action_edit-profile');
let formElementAdPic = popupAddPic.querySelector('.popup__form_action_add-picture');
let nameInput = formElementEdProf.querySelector('#name');
let jobInput = formElementEdProf.querySelector('#job');
let picNameInput = formElementAdPic.querySelector('#picName');
let picLinkInput = formElementAdPic.querySelector('#picLink');
let nameInputNew = document.querySelector('.profile__info-title');
let jobInputNew = document.querySelector('.profile__info-subtitle');

const toggleModal = (modal) => {
  modal.classList.toggle('popup_opened');
}

const openEdFrofPopup = () => {
  toggleModal(popupEdProf);
  nameInput.value = nameInputNew.textContent;
  jobInput.value = jobInputNew.textContent;
}

const closeEdFrofPopup = () => {
  nameInput.value = "";
  jobInput.value = "";
  toggleModal(popupEdProf);
}

const openAdPicPopup = () => {
  toggleModal(popupAddPic);
}

const closeAdPicPopup = () => {
  picNameInput.value = "";
  picLinkInput.value = "";
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

  let addPicture = {};
  addPicture['name'] = picNameInput.value;
  addPicture['link'] = picLinkInput.value;

  cards.prepend(createItems(addPicture));

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

const cards = document.querySelector('.cards');
const template = document.querySelector('.template');

const renderCards = () => {
    const items = initialCards.map(element => createItems(element));
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
  toggleModal(document.querySelector('.popup_action_enlarge-picture'));
}

const handlePicture = (event) => {
  const popupEnlargePic = document.querySelector('.popup_action_enlarge-picture');
  const pictureEnlarged = popupEnlargePic.querySelector('.popup__picture-enlarged');
  const caption = popupEnlargePic.querySelector('.popup__picture-caption');
  const picPopupCloseBtn = popupEnlargePic.querySelector('.popup__close_position_picture-popup');

  toggleModal(popupEnlargePic);

  pictureEnlarged.setAttribute('src', event.target.getAttribute('src'));

  caption.textContent = event.target.nextElementSibling.firstElementChild.textContent;

  picPopupCloseBtn.addEventListener('click', handlePicPopupClose);
}

const createItems = (element) => {
    const card = template.content.cloneNode(true);
    const removeButton = card.querySelector('.card__delete');
    const likeButton = card.querySelector('.card__like-icon');
    const picture = card.querySelector('.card__img');

    cardText = card.querySelector('.card__caption-text');
    cardImg = card.querySelector('.card__img');

    cardText.textContent = element['name'];
    cardImg.setAttribute('src', element['link']);

    removeButton.addEventListener('click', handleRemove);
    likeButton.addEventListener('click', handleLike);
    picture.addEventListener('click', handlePicture);

    return card;
};

renderCards();

