import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cateogry-list',
  templateUrl: './cateogry-list.component.html',
  styleUrls: ['./cateogry-list.component.css']
})
export class CateogryListComponent implements OnInit{

  categories: Category[] = [];
  
  constructor(
    private categoryService: CategoryService,
    private toastRservice: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.listCategories();
  }

  trackById(index: number, category: Category): number {
      return category.id; // Devuelve el id único de cada categoria
  }

  listCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data);
      },
      error: (error) => {
        console.log("Error ", error)
      }
    })
  }

}
