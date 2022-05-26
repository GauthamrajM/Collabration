import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userObj:FormGroup;
  errStatus:boolean=false;
  errMessage;

  constructor(private fb:FormBuilder,private ls:LoginService,private router:Router) { }
  
   ngOnInit(): void {
     this.userObj=this.fb.group({
       username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
       password:['',[Validators.required]]
     })
  }

  userLogin(){
    // console.log("UserObj",this.userObj.value)
    this.ls.userLogin(this.userObj.value).subscribe({
      next:(res)=>{
        //console.log("res",res)
        if(res.message=="login success"){
          this.errStatus=false;
          //get token from res obj
          let token=res.token;
          this.ls.userLoginStatus=true;
          //get loggedin user details
          this.ls.currentUser=res.user;
          //store token in localstorage
          localStorage.setItem("token",token)
          //navigate to userdashboard
          this.router.navigateByUrl(`/home/${res.user.username}`)
        }
        else{
          this.errStatus=true;
          this.errMessage=res.message;
        }
      },
      error:(err)=>{
        console.log("err",err)
      }
    })
  }

  //getter
  get username(){
    return this.userObj.get('username')
  }

  get password(){
    return this.userObj.get('password')
  }

}
