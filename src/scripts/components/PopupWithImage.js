import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(event) {
    super.open();

    this._caption = this._popup.querySelector('.popup__picture-caption');
    this._img = this._popup.querySelector('.popup__picture-enlarged');

    this._img.setAttribute('src', event.target.getAttribute('src'));
    this._caption.textContent = event.target.nextElementSibling.firstElementChild.textContent;
  }
}
