import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment.development';
import { ProductFormData } from '../interfaces/product-form-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable <Product []> {
    return this.httpClient.get<Product[]>(this.apiURL);
  }

  createProduct(formData: ProductFormData): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL, formData);
  }

  updateProduct(id: number, formData: ProductFormData) {
    return this.httpClient.put<Product>(`${this.apiURL}/${id}`, formData);
  }

  deleteProductByID(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }

  getProductByID(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURL}/${id}`);
  }
}
