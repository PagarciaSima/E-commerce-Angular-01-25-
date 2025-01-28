import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

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
      },
      error: () => {
        this.toastRservice.error('Unexpected error -> Error :: listCategories', 'Categories');
      }
    })
  }

  deleteCategoryById(id: number) {
      Swal.fire({
        title: "Are you sure that you want to delete this category?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
  
          this.categoryService.deleteCategoryById(id).subscribe({
            next: () => {
              this.listCategories();
            }
          });
  
          Swal.fire({
            title: "Deleted!",
            text: "The category has been deleted.",
            icon: "success"
          });
        }
      });
  
    }

}
