import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRestaurant, Restaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from 'app/entities/acount/acount.service';
import { ICooperative } from 'app/shared/model/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/cooperative.service';

type SelectableEntity = IAcount | ICooperative;

@Component({
  selector: 'jhi-restaurant-update',
  templateUrl: './restaurant-update.component.html',
})
export class RestaurantUpdateComponent implements OnInit {
  isSaving = false;
  acounts: IAcount[] = [];
  cooperatives: ICooperative[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    adress: [null, [Validators.required]],
    acount: [],
    cooperative: [],
  });

  constructor(
    protected restaurantService: RestaurantService,
    protected acountService: AcountService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurant }) => {
      this.updateForm(restaurant);

      this.acountService
        .query({ filter: 'restaurant-is-null' })
        .pipe(
          map((res: HttpResponse<IAcount[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAcount[]) => {
          if (!restaurant.acount || !restaurant.acount.id) {
            this.acounts = resBody;
          } else {
            this.acountService
              .find(restaurant.acount.id)
              .pipe(
                map((subRes: HttpResponse<IAcount>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAcount[]) => (this.acounts = concatRes));
          }
        });

      this.cooperativeService.query().subscribe((res: HttpResponse<ICooperative[]>) => (this.cooperatives = res.body || []));
    });
  }

  updateForm(restaurant: IRestaurant): void {
    this.editForm.patchValue({
      id: restaurant.id,
      name: restaurant.name,
      adress: restaurant.adress,
      acount: restaurant.acount,
      cooperative: restaurant.cooperative,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const restaurant = this.createFromForm();
    if (restaurant.id !== undefined) {
      this.subscribeToSaveResponse(this.restaurantService.update(restaurant));
    } else {
      this.subscribeToSaveResponse(this.restaurantService.create(restaurant));
    }
  }

  private createFromForm(): IRestaurant {
    return {
      ...new Restaurant(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      acount: this.editForm.get(['acount'])!.value,
      cooperative: this.editForm.get(['cooperative'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRestaurant>>): void {
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
