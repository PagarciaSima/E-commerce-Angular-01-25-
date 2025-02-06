import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private sessionStorageService: SessionStorageService
  ) {}

  public getHeaders(): HttpHeaders {
    const token = this.sessionStorageService.getItem<string>('token') || '';
    console.log('Header service ', token)

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

  }
}
