import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaymentSys, PaymentSys } from 'app/shared/model/payment-sys.model';
import { PaymentSysService } from './payment-sys.service';
import { PaymentSysComponent } from './payment-sys.component';
import { PaymentSysDetailComponent } from './payment-sys-detail.component';
import { PaymentSysUpdateComponent } from './payment-sys-update.component';

@Injectable({ providedIn: 'root' })
export class PaymentSysResolve implements Resolve<IPaymentSys> {
  constructor(private service: PaymentSysService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentSys> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paymentSys: HttpResponse<PaymentSys>) => {
          if (paymentSys.body) {
            return of(paymentSys.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaymentSys());
  }
}

export const paymentSysRoute: Routes = [
  {
    path: '',
    component: PaymentSysComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.paymentSys.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentSysDetailComponent,
    resolve: {
      paymentSys: PaymentSysResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.paymentSys.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentSysUpdateComponent,
    resolve: {
      paymentSys: PaymentSysResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.paymentSys.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentSysUpdateComponent,
    resolve: {
      paymentSys: PaymentSysResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.paymentSys.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
