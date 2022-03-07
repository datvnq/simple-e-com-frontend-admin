import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product-category',
  templateUrl: './create-product-category.component.html',
  styleUrls: ['./create-product-category.component.css']
})
export class CreateProductCategoryComponent implements OnInit {

  productCategory: ProductCategory = new ProductCategory();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.createProductCategoryForAdmin(this.productCategory).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/admin/products');
      }
    );
  }

}
