import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-autentication"
import { mockAuthentication } from "@/domain/test/mock-autentication";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import faker from "faker"
import { HttpStatusCode } from "@/data/protocols/http/http-response";

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy:HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes =>{
    //factory 
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return { 
        sut,
        httpPostClientSpy
    }
}
describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async() => {
        const url = faker.internet.url()
        const {sut, httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async() => {
        const {sut, httpPostClientSpy} = makeSut()
        const authenticationParams = mockAuthentication()
        await sut.auth(authenticationParams)
        expect(httpPostClientSpy.body).toEqual(authenticationParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async() => {
        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }
        const promise = sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})