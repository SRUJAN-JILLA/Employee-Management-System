import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  role: string;

  constructor(private httpClient: HttpClient) { }

  /* Should generate token */
  public generateToken(loginData: any) {
    let url = environment.generateTokenUrl;
    return this.httpClient.post(`${url}`, loginData);
  }

  /* Should return current user which is logged in */
  public getCurrentUser(): Observable<Employee> {
    let url = environment.currentUserUrl
    return this.httpClient.get<Employee>(`${url}`);
  }

  /* Should store token in local storage */
  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  /* Should check if the user is logged in or not */  
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  /* Should remove token from local storage */
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  /* Should return token from local storage */
  public getToken() {
    return localStorage.getItem("token");
  }

  /* Should set User in local storage */
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /* Should get User from local storage */
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    this.logout();
    return null;
  }

  /* Should return role */
  public getUserRole() {
    let user = this.getUser();
    return user.role;
  }

  /* Should set role */
  public setUserRole(role: string) {
    let user = this.getUser();
    user.role = role;
    this.setUser(user);
    return user.role;
  }
}