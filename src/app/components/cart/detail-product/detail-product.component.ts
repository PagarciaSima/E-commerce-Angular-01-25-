import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{

  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.productService.getProductByID(id).subscribe({
            next: (data) => {
              this.id = id;
              this.name = data.name;
              this.description = data.description;
              this.price = data.price;
            }, error: () => {
              this.toastr.error('Product not found with ID ', id);
            }
          })
        }
      }
    )
  }

  addCart(id: number) {
    console.log('ID product ', this.id);
    console.log('Name product ', this.name);
    console.log('Name description ', this.description);

  }
}
