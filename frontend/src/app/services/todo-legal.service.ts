import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class TodoLegalService {

  api_url = environment.api_url;
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient) { }

  loginUser(username: string, pass: string) {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', pass);
    return this.http.post(`${this.api_url}/auth/login`, formData);
  }

  registerUser(user: User) {
    return this.http.post(
      `${this.api_url}/user`,
      {
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        username: user.username,
        password: user.password
      },
      {headers: this.header}
    )
  }
}
