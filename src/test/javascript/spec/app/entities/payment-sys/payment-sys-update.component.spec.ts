import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { PaymentSysUpdateComponent } from 'app/entities/payment-sys/payment-sys-update.component';
import { PaymentSysService } from 'app/entities/payment-sys/payment-sys.service';
import { PaymentSys } from 'app/shared/model/payment-sys.model';

describe('Component Tests', () => {
  describe('PaymentSys Management Update Component', () => {
    let comp: PaymentSysUpdateComponent;
    let fixture: ComponentFixture<PaymentSysUpdateComponent>;
    let service: PaymentSysService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [PaymentSysUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaymentSysUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentSysUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentSysService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentSys(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentSys();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
