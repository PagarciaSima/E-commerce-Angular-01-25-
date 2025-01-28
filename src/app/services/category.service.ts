import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL: string = environment.apiURLCategories;

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURL, category)
  }

  deleteCategory(id: number) {
    return this.http.delete<Category>(`${this.apiURL}/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }
}
