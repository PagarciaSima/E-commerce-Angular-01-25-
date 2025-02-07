import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  products: Product[] = [];
  userRole: string = '';

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) {
    
  }

  ngOnInit(): void {
    let userID: number = Number(this.sessionStorageService.getItem('userID'));
    this.userService.getUserById(userID).subscribe({
      next: (user) => {
        this.userRole = user.userType;
      }
    });
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
