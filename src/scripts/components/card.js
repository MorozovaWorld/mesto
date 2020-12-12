export class Card {
  constructor(data, cardSelector, { handleCardClick, handleCardDelete, handleCardLike, handleCardUnlike, userId}) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likesLength = data.likes.length;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardUnlike = handleCardUnlike;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._likes.find(({ _id }) => _id === this._userId);
  }

  updateLikes(newLikesData) {
    this._likes = newLikesData;
    this._likesLength = newLikesData.length;

    this._cardLike.classList.toggle('card__like-icon_status_clicked');
    this._likesCounter.textContent = this._likesLength;
  }

  _handleLikes() {
    if (this.isLiked()) {
      this._handleCardUnlike();
    } else {
      this._handleCardLike();
    }
  }

  _handleCardClick() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._cardDelete.addEventListener('click', () => {this._handleCardDelete(this._cardId, )});
    this._cardLike.addEventListener('click', this._handleLikes.bind(this));
    this._cardImg.addEventListener('click', this._handleCardClick);
  }

  removeCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImg = this._element.querySelector('.card__img');
    this._cardLike = this._element.querySelector('.card__like-icon');
    this._cardDelete = this._element.querySelector('.card__delete');
    this._likesCounter = this._element.querySelector('.card__like-counter');


    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._likesCounter.textContent = this._likesLength;
    this._element.querySelector('.card__caption-text').textContent = this._name;

    if (this.isLiked()) {
      this._cardLike.classList.add('card__like-icon_status_clicked');
    } else {
      this._cardLike.classList.remove('card__like-icon_status_clicked');
    }

    if (this._ownerId === this._userId) {
      this._cardDelete.classList.add('card__delete_visible');
    };

    this._setEventListeners();

    return this._element;
  }
}
