import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ImgUploadService } from 'src/app/services/img-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  productCategories: ProductCategory[] = [];
  url: string = "";
  selectedFile: File = null;

  constructor(private productService: ProductService, private router: Router, private imgUploadService: ImgUploadService) { }

  ngOnInit(): void {
    this.productService.getAllProductCategoriesForAdmin().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }

  onSubmit() {
    this.imgUploadService.upload(this.selectedFile).subscribe(
      data => {
        this.product.imageUrl = data.url;
        this.productService.createProductForAdmin(this.product).subscribe(
          data => {
            console.log(data);
            this.router.navigateByUrl('/admin/products');
          }
        );
      }
    );
  }

  onSelectFile(event) {
    console.log(event.target.files);
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    if (event.target.files[0] != null) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event1: any) => {
      this.url=event1.target.result;
      }
    }
    else {
      this.url = "";
    }
  }

  selectCategory(event) {
    this.product.categoryId = event.target.value;
  }

}
