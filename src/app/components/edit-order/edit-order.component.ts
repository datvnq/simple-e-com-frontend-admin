import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { State } from 'src/app/common/state';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order = new Order();
  orderId: number;

  countries: Country[] = [];
  states: State[] = [];  

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByIdForAdmin(this.orderId).subscribe(
      data => {
        this.order = data;
      }
    );

    this.orderService.getCountriesForAdmin().subscribe(
      data => {
        this.countries = data;
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

  getStates(event) {
    const countryCode = event.target.value;
    this.orderService.getStates(countryCode).subscribe(
      data => {
        this.states = data;
      }
    );
  }

}
