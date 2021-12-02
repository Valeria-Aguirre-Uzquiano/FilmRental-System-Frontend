import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { PaymentComponent } from './payment/payment.component';
import { PrincipalComponent } from './principal/principal.component';
import { SessionComponent } from './session/session.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalComponent},
  {path: 'catalog/:id', component: CatalogComponent},
  {path: 'session', component: SessionComponent},
  {path: 'shopcart', component: ShopCartComponent},
  {path: 'payment', component: PaymentComponent},
  {path: '', redirectTo: '/principal', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PrincipalComponent,CatalogComponent,SessionComponent,ShopCartComponent,PaymentComponent]
