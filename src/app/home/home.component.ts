import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user;
  constructor(private ls:LoginService) { }

  ngOnInit(): void {
  this.user=this.ls.currentUser;
  }

}
