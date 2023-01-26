import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../classes/employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) {}

  public generateToken(loginData:any){
    return this.httpClient.post(`${this.baseURL}/generate-token`,loginData);
  }

  //current user which is logged in 
  public getCurrentUser():Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/current-user`);
  }
  
  //login User store token in lcoal storage 
  public loginUser(token:string){
    localStorage.setItem("token",token);
    return true;
  }

  //isLogin or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //logout : remove token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  //set user details
  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr =  localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }
    this.logout();
    return null;
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.role;
  }

  //set user role
/*  public setUserRole(role:string) {
    let user = this.getUser();

    return user.role;
  }*/
}
