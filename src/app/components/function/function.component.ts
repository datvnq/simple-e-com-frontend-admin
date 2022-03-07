import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewAllProducts() {
    this.router.navigateByUrl('/admin/products');
  }

  createProduct() {
    this.router.navigateByUrl('admin/createProduct');
  }
  
  createProductCategory() {
    this.router.navigateByUrl('admin/createProductCategory');
  }
}
