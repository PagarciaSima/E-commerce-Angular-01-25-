import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderState } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit{

  constructor(
    private orderService: OrderService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    
  ) {

  }

  ngOnInit(): void {
    console.log(this.sessionStorageService.getItem('order'));
    let order = this.sessionStorageService.getItem<Order>('order'); 

    let formData = new FormData();
    if (order) {
      formData.append('id', order.id!.toString());
      formData.append('state', OrderState.CONFIRFMED.toString());

      this.orderService.updateOrder(formData).subscribe({
        next: () => {
          this.toastr.success('Payment completed successfully', 'Payment completed');
        },
        error: () => {
          this.toastr.error('The Order could not be confirmed', 'Error');
        }
      });

    }

  }

}
