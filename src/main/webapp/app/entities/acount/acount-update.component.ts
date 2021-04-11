import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAcount, Acount } from 'app/shared/model/acount.model';
import { AcountService } from './acount.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

@Component({
  selector: 'jhi-acount-update',
  templateUrl: './acount-update.component.html',
})
export class AcountUpdateComponent implements OnInit {
  isSaving = false;
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    age: [null, [Validators.min(0), Validators.max(120)]],
    accountID: [null, [Validators.required, Validators.maxLength(16)]],
    adress: [null, [Validators.required]],
    role: [],
  });

  constructor(
    protected acountService: AcountService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acount }) => {
      this.updateForm(acount);

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(acount: IAcount): void {
    this.editForm.patchValue({
      id: acount.id,
      name: acount.name,
      surname: acount.surname,
      age: acount.age,
      accountID: acount.accountID,
      adress: acount.adress,
      role: acount.role,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const acount = this.createFromForm();
    if (acount.id !== undefined) {
      this.subscribeToSaveResponse(this.acountService.update(acount));
    } else {
      this.subscribeToSaveResponse(this.acountService.create(acount));
    }
  }

  private createFromForm(): IAcount {
    return {
      ...new Acount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      age: this.editForm.get(['age'])!.value,
      accountID: this.editForm.get(['accountID'])!.value,
      adress: this.editForm.get(['adress'])!.value,
      role: this.editForm.get(['role'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcount>>): void {
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

  trackById(index: number, item: IRole): any {
    return item.id;
  }
}
