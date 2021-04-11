import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaymentSys, PaymentSys } from 'app/shared/model/payment-sys.model';
import { PaymentSysService } from './payment-sys.service';
import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from 'app/entities/acount/acount.service';

@Component({
  selector: 'jhi-payment-sys-update',
  templateUrl: './payment-sys-update.component.html',
})
export class PaymentSysUpdateComponent implements OnInit {
  isSaving = false;
  acounts: IAcount[] = [];

  editForm = this.fb.group({
    id: [],
    crediteur: [null, [Validators.required]],
    debiteur: [null, [Validators.required]],
    method: [null, [Validators.required]],
    acounts: [],
  });

  constructor(
    protected paymentSysService: PaymentSysService,
    protected acountService: AcountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentSys }) => {
      this.updateForm(paymentSys);

      this.acountService.query().subscribe((res: HttpResponse<IAcount[]>) => (this.acounts = res.body || []));
    });
  }

  updateForm(paymentSys: IPaymentSys): void {
    this.editForm.patchValue({
      id: paymentSys.id,
      crediteur: paymentSys.crediteur,
      debiteur: paymentSys.debiteur,
      method: paymentSys.method,
      acounts: paymentSys.acounts,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentSys = this.createFromForm();
    if (paymentSys.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentSysService.update(paymentSys));
    } else {
      this.subscribeToSaveResponse(this.paymentSysService.create(paymentSys));
    }
  }

  private createFromForm(): IPaymentSys {
    return {
      ...new PaymentSys(),
      id: this.editForm.get(['id'])!.value,
      crediteur: this.editForm.get(['crediteur'])!.value,
      debiteur: this.editForm.get(['debiteur'])!.value,
      method: this.editForm.get(['method'])!.value,
      acounts: this.editForm.get(['acounts'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentSys>>): void {
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

  trackById(index: number, item: IAcount): any {
    return item.id;
  }

  getSelected(selectedVals: IAcount[], option: IAcount): IAcount {
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
