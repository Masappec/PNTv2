

class SmtpEntity{
    public host: string;
    public port: number;
    public secure: boolean;
    public auth: {user: string, pass: string};

    constructor(host: string, port: number, secure: boolean, auth: {user: string, pass: string}){
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.auth = auth;
    }
    
}

export default SmtpEntity;