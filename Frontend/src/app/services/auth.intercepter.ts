import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = "Authorization";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authRequest = req;
        //add the jwt token (local storage ) request
        const token = this.loginService.getToken();
        if (token != null) {
            authRequest = authRequest.clone({ headers: authRequest.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authRequest);
    }
}

export const authIntercepterProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthIntercepter,
        multi: true,
    }
]