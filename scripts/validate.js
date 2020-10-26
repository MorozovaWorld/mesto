
const showInputError = (formElement, input, rest) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(rest.inputErrorClass);
};

const hideInputError = (formElement, input, rest) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove(rest.inputErrorClass);
};

const hideErrors = (formElement, input, rest) => {
  const errorElements = Array.from(formElement.querySelectorAll(rest.errorClass));
  errorElements.forEach((error) => {
    error.textContent = '';
  })
  input.classList.remove(rest.inputErrorClass);
}

const checkInputValidity = (formElement, input, rest) => {
  if (!input.validity.valid) {
    showInputError(formElement, input, rest);

    popupAddPicCloseBtn.addEventListener('click', (evt) => {
      hideErrors(formElement, input, rest)});
    popupEdProfCloseBtn.addEventListener('click', (evt) => {
      hideErrors(formElement, input, rest)});
  } else {
    hideInputError(formElement, input, rest);
  }
};

const toggleButtonState = (formElement, buttonElement, rest) => {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(rest.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(rest.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

const setEventListeners = (formElement, rest) => {
  const inputElements = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target, rest);
      toggleButtonState(formElement, buttonElement, rest);
    });
  });

  toggleButtonState(formElement, buttonElement, rest);
}

const enableValidation = ({ formSelector, ...rest }) => {
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(formElement, rest);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: '.popup__input-error'
});
