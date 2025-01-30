import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemCart } from 'src/app/interfaces/item-cart';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService
    
  ) {
    
  }

  ngOnInit(): void {
    this.items = this.cartService.getListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(1);
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
        this.toastr.error('The user could not be found :: getUserById', 'Sumary Order')
      }
    });
  }

}
