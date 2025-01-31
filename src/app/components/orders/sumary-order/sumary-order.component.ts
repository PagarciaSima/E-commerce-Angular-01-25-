import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemCart } from 'src/app/interfaces/item-cart';
import { Order, OrderState } from 'src/app/interfaces/order';
import { OrderProduct } from 'src/app/interfaces/order-product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sumary-order',
  templateUrl: './sumary-order.component.html',
  styleUrls: ['./sumary-order.component.css']
})
export class SumaryOrderComponent implements OnInit{

  items: ItemCart[] = [];
  totalCart: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  orderProducts: OrderProduct[] = [];
  userId: number = 1;
  isGeneratingOrder: boolean = false; // Disable the button


  constructor(
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.items = this.cartService.getListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(this.userId);
  }

  generateOrder() {
    this.isGeneratingOrder = true;
    this.items.forEach(
      item => {
        let orderProduct: OrderProduct = {
          id: null,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }
        // add each product to the list
        this.orderProducts.push(orderProduct);
      }
    );

    let order: Order = {
      id: null,
      dateCreated: new Date (),
      orderProducts: this.orderProducts,
      userId: this.userId,
      orderState: OrderState.CANCELLED
    }

    this.orderService.createOrder(order).subscribe({
      next: (data) => {
        this.isGeneratingOrder = false;
        this.cartService.clearCart();
        this.router.navigate(['/']);
        this.toastr.success(`New order created (ID ${data.id})`, 'Order created');
      },
      error: () => {
        this.isGeneratingOrder = false;
        this.toastr.error('The order could not be created :: createOrder', 'Error'); 
      }
    })
  }

  deleteItemCart(productId: number) {
    this.cartService.deleteItemCart(productId);
    this.items = this.cartService.getListFromMap();
    this.totalCart = this.cartService.totalCart();

  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
      }, error: () => {
        this.toastr.error('The user could not be found :: getUserById', 'Error')
      }
    });
  }

}
