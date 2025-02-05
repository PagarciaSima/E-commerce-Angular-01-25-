import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { Userdto } from '../interfaces/userdto';
import { Jwtclient } from '../interfaces/jwtclient';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = environment.apiURLAuth
  constructor(
    private httpCLient: HttpClient
  ) { }


  register(user: User): Observable<User> {
    return this.httpCLient.post<User>(`${this.apiUrl}/register`, user);
  }

  login(userDto: Userdto): Observable<Jwtclient> {
    return this.httpCLient.post<Jwtclient>(`${this.apiUrl}/login`, userDto);
  }
}
