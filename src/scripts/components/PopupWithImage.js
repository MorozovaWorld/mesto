import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();

    this._name = data.name;
    this._link = data.link;

    this._caption = this._popup.querySelector('.popup__picture-caption');
    this._img = this._popup.querySelector('.popup__picture-enlarged');

    this._img.setAttribute('src', this._link);
    this._caption.textContent = this._name;
  }
}
