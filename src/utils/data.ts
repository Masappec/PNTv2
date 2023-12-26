export interface MessageTranslation<T> {
   
    status: number;
    message: string;
    json: T | null ;
}