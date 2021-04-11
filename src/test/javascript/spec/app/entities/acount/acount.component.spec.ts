import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { AcountComponent } from 'app/entities/acount/acount.component';
import { AcountService } from 'app/entities/acount/acount.service';
import { Acount } from 'app/shared/model/acount.model';

describe('Component Tests', () => {
  describe('Acount Management Component', () => {
    let comp: AcountComponent;
    let fixture: ComponentFixture<AcountComponent>;
    let service: AcountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [AcountComponent],
      })
        .overrideTemplate(AcountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcountComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcountService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Acount(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.acounts && comp.acounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
