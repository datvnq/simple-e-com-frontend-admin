import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order = new Order();
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.getOrder();
        this.getOrderItems();
      }
    );
  }

  getOrder() {
    const orderId: number = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByIdForAdmin(orderId).subscribe(
      data => {
        this.order = data;
      }
    );
  }

  getOrderItems() {
    const orderId: number = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderItemsByOrderId(orderId).subscribe(
      data => {
        this.orderItems = data;
      }
    );
  }

}
