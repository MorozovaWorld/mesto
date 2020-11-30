export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _handleLike(event) {
    const evtTarget = event.target;
    evtTarget.classList.toggle('card__like-icon_status_clicked');
  };

  _handleRemove(event) {
    event.target.closest('.card').remove();
  };

  _handleCardClick() {
    this._handleCardClick();
  }

  _setEventListeners() {
    this._element.querySelector('.card__delete').addEventListener('click', this._handleRemove);
    this._element.querySelector('.card__like-icon').addEventListener('click', this._handleLike);
    this._element.querySelector('.card__img').addEventListener('click', this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__caption-text').textContent = this._name;

    return this._element;
  }
}
