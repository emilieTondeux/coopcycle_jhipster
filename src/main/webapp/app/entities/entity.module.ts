import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'acount',
        loadChildren: () => import('./acount/acount.module').then(m => m.CoopcycleJhipsterAcountModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.CoopcycleJhipsterRoleModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CoopcycleJhipsterProductModule),
      },
      {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.CoopcycleJhipsterBasketModule),
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.CoopcycleJhipsterRestaurantModule),
      },
      {
        path: 'run',
        loadChildren: () => import('./run/run.module').then(m => m.CoopcycleJhipsterRunModule),
      },
      {
        path: 'payment-sys',
        loadChildren: () => import('./payment-sys/payment-sys.module').then(m => m.CoopcycleJhipsterPaymentSysModule),
      },
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CoopcycleJhipsterCooperativeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CoopcycleJhipsterEntityModule {}
