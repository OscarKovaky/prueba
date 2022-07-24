export interface ResponseApi<T> {
    isValid: boolean;
    errorCode: string;
    errorMessage: string;
    developerMessage: string;
    data: T
}