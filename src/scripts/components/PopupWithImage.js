import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._captionImage = this._popup.querySelector('.popup__picture-caption');
    this._popupCardImage = this._popup.querySelector('.popup__picture-enlarged');
  }

  open(data) {
    super.open();

    this._name = data.name;
    this._link = data.link;

    this._popupCardImage.src = this._link;
    this._captionImage.textContent = this._name;
  }
}
