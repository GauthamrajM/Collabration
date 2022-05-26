import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project1';

  constructor(public ls:LoginService,private router:Router) { }

  logoutUser(){
    if(confirm("Click OK to logout")){
      localStorage.clear();
      this.ls.userLoginStatus=false;
      this.router.navigateByUrl("/login");
    }
    else{
      alert("Stay logged in")
    }
  }
  

}
