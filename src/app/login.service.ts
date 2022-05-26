import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser;

  userLoginStatus:boolean=false;
  
  constructor(private hc:HttpClient) { }

  userLogin(userObj):Observable<any>{
    return this.hc.post('/user/login',userObj);
  }
}
