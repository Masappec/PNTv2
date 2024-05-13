import { PersonEntity } from "../../domain/entities/PersonEntity";
import UserEntity from "../../domain/entities/UserEntity";
import { USER_LOCKED, USER_PASSWORD_LOCKED } from "../../utils/constans";

class SessionService {
  static ACCESS_TOKEN_KEY = "access_token";
  static REFRESH_TOKEN_KEY = "refresh_token";
  static USER_DATA_KEY = "user_data";
  static USER_LOCKED = "locked";
  static ESTABLISHMENT_DATA_KEY = "establishment_data";
  static PERSON_DATA_KEY = "person_data";
  static setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }
  static getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static setEstablishmentData(establishmentData: string) {
    localStorage.setItem(this.ESTABLISHMENT_DATA_KEY, establishmentData);
  }
  static getEstablishmentData() {
    const data = localStorage.getItem(this.ESTABLISHMENT_DATA_KEY) || "{}";

    const json = JSON.parse(data);
    return json;
  }
  static setPersonData(personData: string) {
    localStorage.setItem(this.PERSON_DATA_KEY, personData);
  }

  static getPersonData(): PersonEntity {
    const data = localStorage.getItem(this.PERSON_DATA_KEY) || '{}';

    const json = JSON.parse(data);

    return json as PersonEntity;

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


    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem(this.PERSON_DATA_KEY);

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
