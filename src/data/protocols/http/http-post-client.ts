import { HttpResponse } from ".";

export type HttpPostParams<T> = {
    url: string
    body?: T //opcional
}

export interface HttpPostClient<T, R>{
    post(params: HttpPostParams<T>):Promise<HttpResponse<R>>
}
