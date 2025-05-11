import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutFormComponent } from './cut-form.component';

describe('CutFormComponent', () => {
  let component: CutFormComponent;
  let fixture: ComponentFixture<CutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
