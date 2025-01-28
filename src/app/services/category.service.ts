import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiURL: string = environment.apiURLCategories;

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList() {
    
  }

  createCategory(category: Category) {
    
  }

  deleteCategory(id: number) {
    
  }

  getCategoryById(id: number) {
    
  }
}
