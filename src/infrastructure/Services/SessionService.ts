import UserEntity from "../../domain/entities/UserEntity";
import { USER_LOCKED, USER_PASSWORD_LOCKED } from "../../utils/constans";

class SessionService {
  static ACCESS_TOKEN_KEY = "access_token";
  static REFRESH_TOKEN_KEY = "refresh_token";
  static USER_DATA_KEY = "user_data";
  static USER_LOCKED = "locked";
  static setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }
  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static removeAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  static isAuthenticated() {
    return !!this.getAccessToken();
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static removeRefreshToken() {
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static setUserData(userData: string) {
    localStorage.setItem(this.USER_DATA_KEY, userData);
  }

  static getUserData(): UserEntity {
    const data = localStorage.getItem(this.USER_DATA_KEY) || "{}";

    const json = JSON.parse(data);
    return json;
  }

  static removeUserData() {
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  static clearSession() {
    localStorage.clear();
  }

  static isLogged() {
    return !!this.getAccessToken();
  }

  static setLocked(string: string) {
    localStorage.setItem("locked", string);
  }

  static isLocked() {
    return (
      localStorage.getItem("locked") === USER_LOCKED + USER_PASSWORD_LOCKED
    );
  }
}

export default SessionService;
