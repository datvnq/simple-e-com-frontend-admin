import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  totalPages: number[];

  currentCategoryId: number;
  searchMode: boolean;
  hasCategoryId: boolean;
  keyword: string;
  page: number = 1;
  size: number = 10;

  selectedPage: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.queryParamMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    this.keyword = this.route.snapshot.queryParamMap.get('keyword');
    this.hasCategoryId = this.route.snapshot.queryParamMap.has('categoryId');
    if (this.hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.queryParamMap.get('categoryId');

      this.page = +this.route.snapshot.queryParamMap.get('page');
      if (this.page < 1) {
        this.page = 1;
      }
      this.productService.getProductsByKeywordAndCategoryIdForAdmin(this.currentCategoryId, this.keyword, this.page - 1, this.size).subscribe(
        data => {
          this.products = data['productDtoList']
          this.totalPages = new Array(data['totalPages']);
        }
      );
      
    }
    else {
      this.page = +this.route.snapshot.queryParamMap.get('page');
      if (this.page < 1) {
        this.page = 1;
      }
      this.productService.getProductsByKeywordForAdmin(this.keyword, this.page - 1, this.size).subscribe(
        data => {
          this.products = data['productDtoList'];
          this.totalPages = new Array(data['totalPages']);
        }
      );
    }
    
  }

  handleListProducts() {
    this.hasCategoryId = this.route.snapshot.queryParamMap.has('categoryId');
    if (this.hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.queryParamMap.get('categoryId');

      this.page = +this.route.snapshot.queryParamMap.get('page');
      if (this.page < 1) {
        this.page = 1;
      }

      this.productService.getProductsByCategoryIdForAdmin(this.currentCategoryId, this.page - 1, this.size).subscribe(
        data => {
          this.products = data['productDtoList'];
          this.totalPages = new Array(data['totalPages']);
        }
      );
    }
    else {
      this.page = +this.route.snapshot.queryParamMap.get('page');
      if (this.page < 1) {
        this.page = 1;
      }
      this.productService.getAllProductsForAdmin(this.page - 1, this.size).subscribe(
        data => {
          this.products = data['productDtoList'];
          this.totalPages = new Array(data['totalPages']);
        }
      );
    }
  }

  editProduct(productId: number) {
    this.router.navigateByUrl(`/admin/editProduct/${productId}`);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductForAdmin(productId).subscribe(
      data => {
        this.listProducts();
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
