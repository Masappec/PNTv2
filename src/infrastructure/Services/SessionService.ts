import UserEntity from "../../domain/entities/UserEntity";


class SessionService {
    
    static ACCESS_TOKEN_KEY = 'access_token';
    static REFRESH_TOKEN_KEY = 'refresh_token';
    static USER_DATA_KEY = 'user_data';
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

    static getUserData() {
        const data =  localStorage.getItem(this.USER_DATA_KEY) || '{}';
        
        const json = JSON.parse(data);

        return new UserEntity(json.id, json.username, json.email, json.firstName, json.lastName);
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
    

}

export default SessionService;