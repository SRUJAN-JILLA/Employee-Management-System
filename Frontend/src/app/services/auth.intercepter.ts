import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = "Authorization";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{

    constructor(private loginService: LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authRequest = req;
        //add the jwt token (local storage ) request
        const token = this.loginService.getToken();
        if(token!= null){
            authRequest = authRequest.clone({ headers: authRequest.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authRequest);
    }
}

export const authIntercepterProviders= [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthIntercepter,
        multi:true,
    }
]

// intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let token = localStorage.getItem('token');
//     if (token) {
//         token = token.replace(/^"(.*)"$/, '$1');
//     }

//     if (token) {
//         request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
//     }

//     if (!request.headers.has('Content-Type')) {
//         request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
//     }

//     request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
//     console.log("............");
//     return next.handle(request);
// }
