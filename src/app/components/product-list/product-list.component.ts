import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

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

}
