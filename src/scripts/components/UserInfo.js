export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userPicSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userPicSelector = userPicSelector;
  }

  getUserInfo() {
    this._userData = {};

    this._userData.name = this._userNameSelector.textContent;
    this._userData.info = this._userInfoSelector.textContent;

    return this._userData;
  }

  setUserInfo(newUserData) {
    this._userNameSelector.textContent = newUserData.name;
    this._userInfoSelector.textContent = newUserData.about;
  }

  setUserPic(newUserData) {
    this._userPicSelector.src = newUserData.avatar;
  }
}
