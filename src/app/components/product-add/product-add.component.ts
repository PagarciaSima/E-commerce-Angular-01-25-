import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{

  id: number | undefined = undefined;
  code: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  userId: string = '1';
  categoryId: string = '3';
  selectFile!: File;
 
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.getProductByID();
  }

  saveProduct() {
    const formData = new FormData();
  
    // Sending each part as binary (image and json) and converting to json string 
    formData.append('product',
      new Blob(
        [JSON.stringify({
          name: this.name,
          code: this.code,
          description: this.description,
          price: this.price,
          userId: this.userId,
          categoryId: this.categoryId,
          })
        ], { type: 'application/json' }));
  
    if (this.selectFile) {
      formData.append('image', this.selectFile);
    }
  
    if (this.id) {
      this.updateProduct(formData);
    } else {
      this.createProduct(formData);
    }
  }
  
  private createProduct(formData: FormData) {
    this.productService.createProduct(formData).subscribe({
      next: (data) => {
        this.toastr.success('Product registered successfully', 'Products');
        this.router.navigate(['admin/product']);
      },
      error: (error) => {
        this.toastr.error('Product could not be created', 'Products')
      }
    });
  }

  private updateProduct(formData: FormData) {
    this.productService.updateProduct(this.id!, formData).subscribe({
      next: (data) => {
        this.toastr.success('Product updated successfully', 'Products')
        this.router.navigate(['admin/product']);
      },
      error: (error) => {
        this.toastr.error('Product could not be updated', 'Products')
      }
    });
  }

  getProductByID() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          console.log("ID value: ", id);
          this.productService.getProductByID(id).subscribe({
            next: (data) => {
              this.id = data.id;
              this.code = data.code;
              this.name = data.name;
              this.description = data.description;
              this.price = data.price;
              this.userId = data.userId;
              this.categoryId = data.categoryId;
            }
          });
        }
      }
    )
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement; 
    if (input.files && input.files.length > 0) {
      this.selectFile = input.files[0]; // First selected file
      console.log('Selected file:', this.selectFile.name);
    }
  }
  

}
