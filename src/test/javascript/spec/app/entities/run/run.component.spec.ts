import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleJhipsterTestModule } from '../../../test.module';
import { RunComponent } from 'app/entities/run/run.component';
import { RunService } from 'app/entities/run/run.service';
import { Run } from 'app/shared/model/run.model';

describe('Component Tests', () => {
  describe('Run Management Component', () => {
    let comp: RunComponent;
    let fixture: ComponentFixture<RunComponent>;
    let service: RunService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleJhipsterTestModule],
        declarations: [RunComponent],
      })
        .overrideTemplate(RunComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RunComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RunService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Run(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.runs && comp.runs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
