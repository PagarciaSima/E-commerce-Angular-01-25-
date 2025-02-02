import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CateogryListComponent } from './components/cateogry-list/cateogry-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { DetailProductComponent } from './components/cart/detail-product/detail-product.component';
import { SumaryOrderComponent } from './components/orders/sumary-order/sumary-order.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product/addproduct', component: ProductAddComponent },
  { path: 'admin/product/update/:id', component: ProductAddComponent },

  { path: 'admin/category', component: CateogryListComponent },
  { path: 'admin/category/addcategory', component: CategoryAddComponent },
  { path: 'admin/category/update/:id', component: CategoryAddComponent },

  { path: 'cart/detailproduct/:id', component: DetailProductComponent },
  { path: 'cart/summary', component: SumaryOrderComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)],

  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
