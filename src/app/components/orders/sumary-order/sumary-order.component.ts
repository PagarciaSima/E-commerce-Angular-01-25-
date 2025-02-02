import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, Observable, of, switchMap, throwError } from 'rxjs';
import { ItemCart } from 'src/app/interfaces/item-cart';
import { Order, OrderState } from 'src/app/interfaces/order';
import { OrderProduct } from 'src/app/interfaces/order-product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
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
    private paymentService: PaymentService
  ) {
    
  }

  ngOnInit(): void {
    this.items = this.cartService.getListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(this.userId);
  }

  generateOrder() {
    if (this.items.length === 0) {
      this.toastr.warning('Your cart is empty.', 'Warning');
      return;
    }
  
    this.isGeneratingOrder = true;

    this.orderProducts = this.items.map(item => ({
      id: null,
      quantity: item.quantity,
      price: item.price,
      productId: item.productId
    }));
  
    const order: Order = {
      id: null,
      dateCreated: new Date(),
      orderProducts: this.orderProducts,
      userId: this.userId,
      orderState: OrderState.CANCELLED
    };
  
    this.orderService.createOrder(order)
      .pipe(
        switchMap(orderData => this.processPayment(orderData)), // ⬅️ Extraemos la lógica del pago
        catchError(() => {
          this.toastr.error('There was an error processing your order.', 'Order Error');
          return of(null);
        }),
        finalize(() => this.isGeneratingOrder = false)
    )
    .subscribe();
  }

  private processPayment(orderData: Order): Observable<boolean> {
    const dataPayment = {
      method: 'PAYPAL',
      amount: this.totalCart.toString(),
      currency: 'USD',
      description: `Payment for Order ID ${orderData.id}`
    };
  
    return this.paymentService.getURLPaypalPayment(dataPayment).pipe(
      switchMap(paymentResponse => {
        if (paymentResponse?.url) {
          this.cartService.clearCart();
          window.location.href = paymentResponse.url.toString();
          return of(true);
        }
        return throwError(() => new Error('Invalid payment response'));
      }),
      catchError(() => {
        this.toastr.error('The payment could not be processed.', 'Payment Error');
        return of(false);
      })
    );
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
