import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product;
  productId: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductByIdForAdmin(this.productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  onSubmit() {
    this.productService.editProductForAdmin(this.productId, this.product).subscribe(
      data => {
        console.log(data);
        this.router.navigateByUrl('/admin/products');
      }
    );
  }

}
