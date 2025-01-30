import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = environment.apiURLUsers;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiURL}/${id}`);
  }
}
