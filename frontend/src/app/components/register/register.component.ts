import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {TodoLegalService} from '../../services/todo-legal.service';
import {User} from '../../interfaces/interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  confirmationPasswordField = new FormControl('');

  constructor(private tlService: TodoLegalService) { }

  ngOnInit() {
  }
  matchPassword() {
    if (this.user.password === this.confirmationPasswordField.value && this.confirmationPasswordField.value !== '') {
      return true;
    }
    return false;
  }
  register() {
    this.tlService.registerUser(this.user).subscribe(res => {
      console.log(res);
      //this.router.navigate(['home']);
    });
  }
}
