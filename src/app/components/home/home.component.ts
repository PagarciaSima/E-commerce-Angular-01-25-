import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  products: Product[] = [];

  constructor(private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(data) => {
        this.products = data;
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  trackById(index: number, product: Product): number {
    return product.id; // Devuelve el id único de cada producto
  }

}
