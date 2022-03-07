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
  currentCategoryId: number;
  searchMode: boolean;

  listOfColumn = [
    {
      title: 'Id',
      compare: (a: Product, b: Product) => a.id - b.id,
      priority: 0
    },
    {
      title: 'Name',
      compare: (a: Product, b: Product) => a.name.localeCompare(b.name)
    },
    {
      title: 'Category name',
      compare: (a: Product, b: Product) => a.categoryName.localeCompare(b.categoryName)
    },
    {
      title: 'Unit price',
      compare: (a: Product, b: Product) => a.unitPrice - b.unitPrice,
      priority: 0
    },
    {
      title: 'Unit in stock',
      compare: (a: Product, b: Product) => a.unitInStock - b.unitInStock,
      priority: 0
    },
    {
      title: 'Action'
    }
  ];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.productService.getProductsByCategoryIdForAdmin(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      );
    }
    else {
      this.productService.getAllProductsForAdmin().subscribe(
        data => {
          this.products = data;
        }
      );
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');
    this.productService.getProductsByKeywordForAdmin(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
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

}
