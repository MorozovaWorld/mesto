export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }

  getUserInfo() {
    this._userData = {};

    this._userData.name = this._userNameSelector.textContent;
    this._userData.info = this._userInfoSelector.textContent;

    return this._userData;
  }

  setUserInfo(formData) {
    this._userNameSelector.textContent = formData.name;
    this._userInfoSelector.textContent = formData.info;
  }
}
