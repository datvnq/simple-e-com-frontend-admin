import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthService } from './services/auth.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductService } from './services/product.service';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { SearchComponent } from './components/search/search.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FunctionComponent } from './components/function/function.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { CreateProductCategoryComponent } from './components/create-product-category/create-product-category.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    LoginStatusComponent,
    SearchComponent,
    ProductCategoryComponent,
    EditProductComponent,
    FunctionComponent,
    CreateProductComponent,
    CreateProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPaginationModule,
    HttpClientModule,
    FormsModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzNotificationModule,
    ReactiveFormsModule,
    NzCardModule,
    NzLayoutModule,
    NzTableModule,
  ],
  providers: [AuthService, ProductService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
