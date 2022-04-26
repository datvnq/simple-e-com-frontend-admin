import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllOrdersForAdmin(page: number, size: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseURL}/api/orders?` + `page=${page}&size=${size}`);
  }

  getOrderByOrderTrackingNumberForAdmin(orderTrackingNumber: string, page: number, size: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseURL}/api/orders?` + `keyword=${orderTrackingNumber}`+ `&page=${page}&size=${size}`);
  }

  getOrderByIdForAdmin(orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.baseURL}/api/order/${orderId}`);
  }

  editOrderForAdmin(orderId: number, order: Order): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/api/order/${orderId}`, order);
  }

  deleteOrderForAdmin(orderId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/api/order/${orderId}`);
  }

  getOrderItemsByOrderId(orderId: number): Observable<OrderItem[]> {
    return this.httpClient.get<OrderItem[]>(`${this.baseURL}/api/orderItems/${orderId}`);
  }

  getCountriesForAdmin(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.baseURL}/api/countries`);
  }

  getStates(countryCode: string): Observable<State[]> {
    return this.httpClient.get<State[]>(`${this.baseURL}/api/states/${countryCode}`);
  }
  
}
