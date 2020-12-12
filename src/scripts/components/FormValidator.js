export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this.hideInputError(input);
    }
  };

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  disableSubmitBtn(popupSubmitDisabledSelector) {
    this._buttonElement.classList.add(popupSubmitDisabledSelector);
    this._buttonElement.disabled = true;
  }

  enabledSubmitBtn(popupSubmitDisabledSelector) {
    this._buttonElement.classList.remove(popupSubmitDisabledSelector);
    this._buttonElement.disabled = false;
  }

  _setEventListeners() {
    const inputElements = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  }
}
