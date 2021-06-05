import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../interfaces/interface';
import {TodoLegalService} from '../../services/todo-legal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 user: User = {
   name: '',
   last_name: '',
   email: '',
   phone_number: '',
   username: '',
   password: '',
   uuid: '',
   state: ''
 };
  alertMessage = '';
  warningState = false;
  errorState = false;

  constructor(private tlService: TodoLegalService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.tlService.loginUser(this.user.username, this.user.password).subscribe(res => {
      // this.router.navigate(['home']);
      if (res['status'] === 'OK') {
        this.user.username = res['username'];
        this.user.name = res['name'];
        this.user.last_name = res['last_name'];
        this.user.email = res['email'];
        this.router.navigate(['user'], {queryParams: {user: JSON.stringify(this.user)}});
      } else {
        this.alertMessage = res['message'];
        this.warningState = true;
      }
    }, err => {
      this.errorState = true;
      this.alertMessage = 'Error al procesar información.';
    });
  }

}
