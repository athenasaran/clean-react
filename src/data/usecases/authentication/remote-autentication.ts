import { AuthenticationParams } from "@/domain/usecases/autentication"
import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

export class RemoteAuthentication{
    constructor(
        private readonly url:string,
        private readonly httpPostClient:HttpPostClient
        ){

         }

    async auth(params: AuthenticationParams):Promise<void>{
       const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch(httpResponse.statusCode) {
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: return Promise.resolve()
        }
       
    }
}