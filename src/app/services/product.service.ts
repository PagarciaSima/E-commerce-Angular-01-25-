import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable <Product []> {
    return this.httpClient.get<Product[]>(this.apiURL);
  }
}
