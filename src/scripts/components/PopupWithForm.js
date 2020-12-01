import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, handleDefaultFormValues}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input-text');
    this._handleDefaultFormValues = handleDefaultFormValues;
  }

  open() {
    super.open();
    this._handleDefaultFormValues();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.close();
    })
  }

  close() {
    super.close();
    this._formElement.reset();
    delete this._formValues;
  }
}
