import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  setEventListeners({data, cardElement}) {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit({data, cardElement});

      this.close();
    })
  }
}
