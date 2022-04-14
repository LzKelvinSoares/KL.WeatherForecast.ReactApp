export type HttpResponse<T,S> = {
    status: number;
    data: T | string;
}