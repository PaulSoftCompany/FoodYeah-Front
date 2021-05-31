import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/_pages/login/login.component'
import { RegisterComponent } from 'src/_pages/login/register/register.component';
import { HomeComponent } from 'src/_pages/home/home.component';
import { ProductComponent } from 'src/_pages/product/product.component';
import { OrderComponent } from 'src/_pages/order/order.component';
import { ProductlistComponent } from 'src/_pages/product/productlist/productlist.component';
import { ProductcategoryComponent } from 'src/_pages/productcategory/productcategory.component';
import { CardComponent } from 'src/_pages/cards/card.component';
import { OrderuserComponent } from 'src/_pages/order/orderuser/orderuser.component';
import { OrderuserbuyComponent } from 'src/_pages/order/orderuserbuy/orderuserbuy.component';


const routes: Routes = [
{path:'login', component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'home',component:HomeComponent},
{path:'products',component:ProductComponent},
{path:'orders',component:OrderComponent},
{path:'cards',component:CardComponent},
{path:'productslist',component:ProductlistComponent},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path:'orderuserbuy/:id',component:OrderuserbuyComponent},
{path:'product_categories',component:ProductcategoryComponent},
{path:'orderuser/:id',component:OrderuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
