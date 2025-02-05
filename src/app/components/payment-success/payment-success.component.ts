import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { Order, OrderState } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private router: Router,
    private orderService: OrderService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let order = this.sessionStorageService.getItem<Order>('order');

    if (!order) {
      // Si no hay orden, redirigir y limpiar el sessionStorage
      this.router.navigate(['/']);
      return;
    }

    let formData = new FormData();
    formData.append('id', order.id!.toString());
    formData.append('state', OrderState.CONFIRFMED.toString());

    this.orderService.updateOrder(formData).subscribe({
      next: () => {
        this.toastr.success('Payment completed successfully', 'Payment completed');
        this.sessionStorageService.removeItem('order'); // Limpiar después de procesar
      },
      error: (error) => {
        console.log(error.error);
        this.toastr.error('The Order could not be confirmed', 'Error');
      }
    });
  }
}
