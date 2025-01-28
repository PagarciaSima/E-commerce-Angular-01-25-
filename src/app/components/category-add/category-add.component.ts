import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  }

  addCategory() {
    let category: Category = { id: this.id, name: this.name };
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        this.toastR.success('Category registered successfully', 'Categories');
        this.router.navigate(['admin/category']);
      }, error: () => {
        this.toastR.error('The category could not be created', 'Categories')
      }
    })
  }

}
