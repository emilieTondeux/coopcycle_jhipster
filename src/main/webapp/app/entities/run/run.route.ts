import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRun, Run } from 'app/shared/model/run.model';
import { RunService } from './run.service';
import { RunComponent } from './run.component';
import { RunDetailComponent } from './run-detail.component';
import { RunUpdateComponent } from './run-update.component';

@Injectable({ providedIn: 'root' })
export class RunResolve implements Resolve<IRun> {
  constructor(private service: RunService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRun> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((run: HttpResponse<Run>) => {
          if (run.body) {
            return of(run.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Run());
  }
}

export const runRoute: Routes = [
  {
    path: '',
    component: RunComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.run.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RunDetailComponent,
    resolve: {
      run: RunResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.run.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RunUpdateComponent,
    resolve: {
      run: RunResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.run.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RunUpdateComponent,
    resolve: {
      run: RunResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleJhipsterApp.run.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
