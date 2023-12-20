

class SessionService {
    
    static ACCESS_TOKEN_KEY = 'access_token';
    static REFRESH_TOKEN_KEY = 'refresh_token';
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

    

}

export default SessionService;