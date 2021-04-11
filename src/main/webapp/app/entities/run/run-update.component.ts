import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRun, Run } from 'app/shared/model/run.model';
import { RunService } from './run.service';
import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from 'app/entities/basket/basket.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';

type SelectableEntity = IBasket | IRestaurant;

@Component({
  selector: 'jhi-run-update',
  templateUrl: './run-update.component.html',
})
export class RunUpdateComponent implements OnInit {
  isSaving = false;
  baskets: IBasket[] = [];
  restaurants: IRestaurant[] = [];

  editForm = this.fb.group({
    id: [],
    clientName: [null, [Validators.required]],
    runnerName: [null, [Validators.required]],
    method: [null, [Validators.required]],
    basket: [],
    restaurant: [],
  });

  constructor(
    protected runService: RunService,
    protected basketService: BasketService,
    protected restaurantService: RestaurantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ run }) => {
      this.updateForm(run);

      this.basketService
        .query({ filter: 'run-is-null' })
        .pipe(
          map((res: HttpResponse<IBasket[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBasket[]) => {
          if (!run.basket || !run.basket.id) {
            this.baskets = resBody;
          } else {
            this.basketService
              .find(run.basket.id)
              .pipe(
                map((subRes: HttpResponse<IBasket>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBasket[]) => (this.baskets = concatRes));
          }
        });

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));
    });
  }

  updateForm(run: IRun): void {
    this.editForm.patchValue({
      id: run.id,
      clientName: run.clientName,
      runnerName: run.runnerName,
      method: run.method,
      basket: run.basket,
      restaurant: run.restaurant,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const run = this.createFromForm();
    if (run.id !== undefined) {
      this.subscribeToSaveResponse(this.runService.update(run));
    } else {
      this.subscribeToSaveResponse(this.runService.create(run));
    }
  }

  private createFromForm(): IRun {
    return {
      ...new Run(),
      id: this.editForm.get(['id'])!.value,
      clientName: this.editForm.get(['clientName'])!.value,
      runnerName: this.editForm.get(['runnerName'])!.value,
      method: this.editForm.get(['method'])!.value,
      basket: this.editForm.get(['basket'])!.value,
      restaurant: this.editForm.get(['restaurant'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRun>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
