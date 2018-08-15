export class ResponseModel<T> {
    errorCode: string;
    totalPage: number;
    result: T;
}