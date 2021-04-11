import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { PaymentSysComponent } from 'app/entities/payment-sys/payment-sys.component';
import { PaymentSysService } from 'app/entities/payment-sys/payment-sys.service';
import { PaymentSys } from 'app/shared/model/payment-sys.model';

describe('Component Tests', () => {
  describe('PaymentSys Management Component', () => {
    let comp: PaymentSysComponent;
    let fixture: ComponentFixture<PaymentSysComponent>;
    let service: PaymentSysService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [PaymentSysComponent],
      })
        .overrideTemplate(PaymentSysComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentSysComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentSysService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaymentSys(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paymentSys && comp.paymentSys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
