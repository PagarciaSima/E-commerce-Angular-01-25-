import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CateogryListComponent } from './components/cateogry-list/cateogry-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/product', component: ProductListComponent },
  { path: 'admin/product/addproduct', component: ProductAddComponent },
  { path: 'admin/product/update/:id', component: ProductAddComponent },

  { path: 'admin/category', component: CateogryListComponent },
  { path: 'admin/category/addcategory', component: CategoryAddComponent },


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
