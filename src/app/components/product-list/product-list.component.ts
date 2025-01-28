import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.listProduct();
  }

  trackById(index: number, product: Product): number {
    return product.id; // Devuelve el id único de cada producto
  }

  listProduct() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      }, error: (error) => {
        console.log(error);
      } 
    });
  }

  deleProductById(id: number) {
    Swal.fire({
      title: "Are you sure that you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteProductByID(id).subscribe({
          next: () => {
            this.listProduct();
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success"
        });
      }
    });

  }

}
