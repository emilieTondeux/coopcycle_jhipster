import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAcount, Acount } from 'app/shared/model/acount.model';
import { AcountService } from './acount.service';
import { AcountComponent } from './acount.component';
import { AcountDetailComponent } from './acount-detail.component';
import { AcountUpdateComponent } from './acount-update.component';

@Injectable({ providedIn: 'root' })
export class AcountResolve implements Resolve<IAcount> {
  constructor(private service: AcountService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcount> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((acount: HttpResponse<Acount>) => {
          if (acount.body) {
            return of(acount.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Acount());
  }
}

export const acountRoute: Routes = [
  {
    path: '',
    component: AcountComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.acount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AcountDetailComponent,
    resolve: {
      acount: AcountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.acount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AcountUpdateComponent,
    resolve: {
      acount: AcountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.acount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AcountUpdateComponent,
    resolve: {
      acount: AcountResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.acount.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
