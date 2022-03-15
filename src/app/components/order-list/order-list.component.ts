import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  page: number = 1;
  size: number = 10;
  orders: Order[];
  totalPages: number[];
  searchMode: boolean;
  keyword: string;

  selectedPage: any;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(() => {
      this.listOrders();
    });
  }

  listOrders() {
    this.searchMode = this.route.snapshot.queryParamMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchOrders();
    }
    else {
      this.handleListOrders();
    }
  }

  handleSearchOrders() {
    this.keyword = this.route.snapshot.queryParamMap.get('keyword');
    this.page = +this.route.snapshot.queryParamMap.get('page');
    if (this.page < 1) {
      this.page = 1;
    }
    this.orderService.getOrderByOrderTrackingNumberForAdmin(this.keyword, this.page - 1, this.size).subscribe(
      data => {
        this.orders = data['content'];
        this.totalPages = new Array(data['totalPages']);
      }
    );
  }

  handleListOrders() {
    this.page = +this.route.snapshot.queryParamMap.get('page');
    if (this.page < 1) {
      this.page = 1;
    }
    this.orderService.getAllOrdersForAdmin(this.page - 1, this.size).subscribe(
      data => {
        this.orders = data['content'];
        this.totalPages = new Array(data['totalPages']);
      }
    );
  }

  orderDetails(orderId: number) {
    this.router.navigateByUrl(`/admin/orders/${orderId}`);
  }

  editOrder(orderId: number) {
    this.router.navigateByUrl(`/admin/editOrder/${orderId}`);
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrderForAdmin(orderId).subscribe(
      data => {
        this.listOrders();
      }
    );
  }

  select(item) {
    this.selectedPage = item; 
  };

  isActive(item) {
    this.route.queryParamMap.subscribe(
      () => {
        const querryParamPage: number = +this.route.snapshot.queryParamMap.get('page');
        this.selectedPage = querryParamPage - 1;
      }
    );
    return this.selectedPage == item;
  };

  selectPage() {
    this.route.queryParamMap.subscribe(
      () => {
        const querryParamPage: number = +this.route.snapshot.queryParamMap.get('page');
        this.selectedPage = querryParamPage - 1;
        this.select(this.selectedPage);
        this.isActive(this.selectedPage);
      }
    );
  }

}
