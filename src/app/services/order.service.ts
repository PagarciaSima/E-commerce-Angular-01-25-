import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiURL: string = environment.apiURLOrders;

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService
  ) { }

  createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.apiURL, order, {headers: this.headerService.getHeaders()});
  }

  getTotalPrice(order: Order): number {
    let totalCounter = 0;
    for (let orderProduct of order.orderProducts) {
      totalCounter += orderProduct.quantity * orderProduct.price;
    }
    return totalCounter;
  }

  updateOrder(formData: FormData): Observable<FormData> {
    return this.httpClient.patch<FormData>(`${this.apiURL}/update/state/order`, formData, {headers: this.headerService.getHeaders()});
  }
    
  getOrderByUserId(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiURL}/by-user/${userId}`, {headers: this.headerService.getHeaders()});
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiURL}/${id}`, {headers: this.headerService.getHeaders()});
  }
}
