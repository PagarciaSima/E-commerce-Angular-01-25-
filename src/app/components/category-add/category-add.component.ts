import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit{
  id: number = 0;
  name: string = '';

  constructor(
    private categoryService: CategoryService,
    private toastR: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory() {
    let category: Category = { id: this.id, name: this.name };
    if (this.id) {
      this.updateCategory(category);
    } else {
      this.newCategory(category);
    }
  }

  private newCategory(category: Category) {
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        this.toastR.success('Category registered successfully', 'Categories');
        this.router.navigate(['admin/category']);
      }, error: () => {
        this.toastR.error('The category could not be created', 'Categories');
      }
    });
  }

  private updateCategory(category: Category) {
    this.categoryService.updateCategory(this.id, category).subscribe({
      next: () => {
        this.toastR.success('Category updated successfully', 'Categories');
        this.router.navigate(['admin/category']);
      }, error: () => {
        this.toastR.error('The category could not be updated', 'Categories');
      }
    });
  }

getCategoryById() {
  this.activatedRoute.params.pipe(
    switchMap(({ id }) => this.categoryService.getCategoryById(id))
  ).subscribe({
    next: ({ id, name }) => {
      this.id = id;
      this.name = name;
    },
    error: (err) => {
      console.error('Error, there is not a category with the given id:', this.id);
    }
  });
}

}
