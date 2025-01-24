import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product/addproduct', component: ProductAddComponent },
  { path: 'admin/product/update/:id', component: ProductAddComponent },

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
