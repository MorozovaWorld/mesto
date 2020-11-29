import Popup from '../components/Popup.js';

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
    this._hideInputErrors();
  }

  _hideInputErrors() {
    this._inputErrors = Array.from(this._popup.querySelectorAll('.popup__input-error'));
    this._inputErrors.forEach((error) => {
      error.textContent = '';
    });

    this._inputsWithErrors = Array.from(this._inputList);
    this._inputsWithErrors.forEach((errorInput) => {
      errorInput.classList.remove('popup__input-text_type_error');
    })
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});

    console.log(this._formValues);

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
