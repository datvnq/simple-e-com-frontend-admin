import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getAllProductsForAdmin(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}/api/products`);
  }

  getProductByIdForAdmin(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}/api/product/${productId}`);
  }

  getProductsByKeywordForAdmin(keyword: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}/api/products/${keyword}`);
  }

  editProductForAdmin(productId: number, product: Product): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/api/product/${productId}`, product);
  }

  deleteProductForAdmin(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/api/product/${productId}`);
  }

  getProductsByCategoryIdForAdmin(categoryId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseURL}/api/productCategory/${categoryId}`);
  }

  getAllProductCategoriesForAdmin(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${this.baseURL}/api/productCategories`);
  }

  createProductForAdmin(product: Product): Observable<any> {
    return this.httpClient.post<Product>(`${this.baseURL}/api/product`, product);
  }

  createProductCategoryForAdmin(productCategory: ProductCategory): Observable<any> {
    return this.httpClient.post<ProductCategory>(`${this.baseURL}/api/productCategory`, productCategory);
  }
}
