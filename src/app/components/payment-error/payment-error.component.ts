import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.css']
})
export class PaymentErrorComponent implements OnInit{

  constructor(
      private router: Router,
      private sessionStorageService: SessionStorageService,
    ) {}
  
    ngOnInit(): void {
      let order = this.sessionStorageService.getItem<Order>('order');
  
      if (!order) {
        // Si no hay orden, redirigir y limpiar el sessionStorage
        this.router.navigate(['/']);
        return;
      }

    }
}
