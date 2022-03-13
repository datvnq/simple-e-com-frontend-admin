import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  hasCategoryId: boolean;
  selectForm: FormControl = new FormControl();
  selectedCategory: number;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getAllProductCategoriesForAdmin().subscribe(
      data => {
        this.productCategories = data;
      }
    );

    this.route.queryParamMap.subscribe(
      () => {
        this.hasCategoryId = this.route.snapshot.queryParamMap.has('categoryId');
        if (!this.hasCategoryId) {
          this.selectForm.setValue(0);
        }
      }
    );
  }

  viewAllOrders() {
    this.router.navigateByUrl('/admin/orders');
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

  selectCategory(event) {
    this.selectedCategory = event.target.value;
    if (this.selectedCategory == 0) {
      this.router.navigateByUrl('/admin/products');
    }
    else {
      this.router.navigate(['/admin/products'], { queryParams: {categoryId: this.selectedCategory} });
    }
  }
}
