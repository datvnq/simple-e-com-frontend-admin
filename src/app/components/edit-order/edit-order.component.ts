import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order = new Order();
  orderId: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByIdForAdmin(this.orderId).subscribe(
      data => {
        this.order = data;
      }
    );
  }

  onSubmit() {
    this.orderService.editOrderForAdmin(this.orderId, this.order).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/admin/orders');
      }
    );
  }

}
