import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL: string = environment.apiURLCategories;

  constructor(
    private http: HttpClient,
    private headerService: HeaderService
  ) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL, {headers: this.headerService.getHeaders()});
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURL, category, {headers: this.headerService.getHeaders()})
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURL}/${id}`, category, {headers: this.headerService.getHeaders()})
  }

  deleteCategoryById(id: number) {
    return this.http.delete<Category>(`${this.apiURL}/${id}`, {headers: this.headerService.getHeaders()});
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`, {headers: this.headerService.getHeaders()});
  }
}
