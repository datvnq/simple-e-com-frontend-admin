import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductCategoryComponent } from './components/create-product-category/create-product-category.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin/products', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'admin/editProduct/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'admin/category/:id', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'admin/search/:keyword', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'admin/createProduct', component: CreateProductComponent, canActivate: [AuthGuard]},
  {path: 'admin/createProductCategory', component: CreateProductCategoryComponent, canActivate: [AuthGuard]},
  {path: 'admin/editProduct/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
