export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  _hideInputError(formElement, input) {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity(formElement, input) {
    if (!input.validity.valid) {
      this._showInputError(formElement, input);
    } else {
      this._hideInputError(formElement, input);
    }
  };

  _toggleButtonState(formElement, buttonElement) {
    if (formElement.checkValidity()) {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(formElement, evt.target);
        this._toggleButtonState(formElement, buttonElement);
      });
    });

    this._toggleButtonState(formElement, buttonElement);
  }

  enableValidation() {
    const formElements = Array.from(document.querySelectorAll(this._config.formSelector));

    formElements.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })

      this._setEventListeners(formElement);
    })
  }
}

