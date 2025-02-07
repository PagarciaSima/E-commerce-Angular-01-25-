import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL: string = environment.apiURLProducts;

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService
  ) { }

  getProducts(): Observable <Product []> {
    return this.httpClient.get<Product[]>(this.apiURL, {headers: this.headerService.getHeaders()});
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL, formData, {headers: this.headerService.getHeaders()});
  }

  updateProduct(id: number, formData: FormData) {
    return this.httpClient.put<Product>(`${this.apiURL}/${id}`, formData, {headers: this.headerService.getHeaders()});
  }

  deleteProductByID(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`, {headers: this.headerService.getHeaders()});
  }

  getProductByID(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURL}/${id}`, {headers: this.headerService.getHeaders()});
  }
}
