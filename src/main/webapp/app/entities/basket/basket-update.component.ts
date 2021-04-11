import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketService } from './basket.service';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from 'app/entities/acount/acount.service';

type SelectableEntity = IRestaurant | IProduct | IAcount;

type SelectableManyToManyEntity = IRestaurant | IProduct;

@Component({
  selector: 'jhi-basket-update',
  templateUrl: './basket-update.component.html',
})
export class BasketUpdateComponent implements OnInit {
  isSaving = false;
  restaurants: IRestaurant[] = [];
  products: IProduct[] = [];
  acounts: IAcount[] = [];

  editForm = this.fb.group({
    id: [],
    nbElements: [null, [Validators.required]],
    price: [null, [Validators.required]],
    restaurants: [],
    products: [],
    acount: [],
  });

  constructor(
    protected basketService: BasketService,
    protected restaurantService: RestaurantService,
    protected productService: ProductService,
    protected acountService: AcountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ basket }) => {
      this.updateForm(basket);

      this.restaurantService.query().subscribe((res: HttpResponse<IRestaurant[]>) => (this.restaurants = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.acountService.query().subscribe((res: HttpResponse<IAcount[]>) => (this.acounts = res.body || []));
    });
  }

  updateForm(basket: IBasket): void {
    this.editForm.patchValue({
      id: basket.id,
      nbElements: basket.nbElements,
      price: basket.price,
      restaurants: basket.restaurants,
      products: basket.products,
      acount: basket.acount,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const basket = this.createFromForm();
    if (basket.id !== undefined) {
      this.subscribeToSaveResponse(this.basketService.update(basket));
    } else {
      this.subscribeToSaveResponse(this.basketService.create(basket));
    }
  }

  private createFromForm(): IBasket {
    return {
      ...new Basket(),
      id: this.editForm.get(['id'])!.value,
      nbElements: this.editForm.get(['nbElements'])!.value,
      price: this.editForm.get(['price'])!.value,
      restaurants: this.editForm.get(['restaurants'])!.value,
      products: this.editForm.get(['products'])!.value,
      acount: this.editForm.get(['acount'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBasket>>): void {
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

  getSelected(selectedVals: SelectableManyToManyEntity[], option: SelectableManyToManyEntity): SelectableManyToManyEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
