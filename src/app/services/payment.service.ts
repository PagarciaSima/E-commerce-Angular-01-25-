import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DataPayment } from '../interfaces/data-payment';
import { Observable } from 'rxjs';
import { UrlPaypalResponse } from '../interfaces/url-paypal-response';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiURL: string = environment.apiURLPayment;

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService
  ) { }

  getURLPaypalPayment(dataPayment: DataPayment): Observable<UrlPaypalResponse> {
    return this.httpClient.post<UrlPaypalResponse>(this.apiURL, dataPayment, {headers: this.headerService.getHeaders()}, );
  }
}
