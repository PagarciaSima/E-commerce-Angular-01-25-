import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemCart } from 'src/app/interfaces/item-cart';
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
              this.urlImage = data.urlImage
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

    let item: ItemCart = {
      productId: this.id,
      productName: this.name,
      quantity: this.quantity,
      price: this.price
    }

    this.cartService.addItemCart(item);
    this.toastr.success('Product added to cart ', 'My cart');

  }
}
