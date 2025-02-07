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
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { authGuard } from './guards/auth.guard';
import { roleadminGuard } from './guards/roleadmin.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin/product', component: ProductListComponent, canActivate: [authGuard, roleadminGuard] },
  { path: 'admin/product/addproduct', component: ProductAddComponent, canActivate: [authGuard] },
  { path: 'admin/product/update/:id', component: ProductAddComponent,  canActivate: [authGuard] },

  { path: 'admin/category', component: CateogryListComponent, canActivate: [authGuard]},
  { path: 'admin/category/addcategory', component: CategoryAddComponent, canActivate: [authGuard] },
  { path: 'admin/category/update/:id', component: CategoryAddComponent, canActivate: [authGuard] },

  { path: 'cart/detailproduct/:id', component: DetailProductComponent, canActivate: [authGuard] },
  { path: 'cart/summary', component: SumaryOrderComponent, canActivate: [authGuard] },
  { path: 'payment/success', component: PaymentSuccessComponent, canActivate: [authGuard] },
  { path: 'payment/error', component: PaymentErrorComponent, canActivate: [authGuard] },

  { path: 'user/register', component: RegistrationComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/logout', component: LogoutComponent},

  { path: 'auth/denied', component: UnauthorizedComponent},


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
