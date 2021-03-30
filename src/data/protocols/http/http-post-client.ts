import { HttpResponse } from "./http-response";

export type HttpPostParams = {
    url: string
    body?: object //opcional
}

export interface HttpPostClient{
    post(params: HttpPostParams):Promise<HttpResponse>
}
