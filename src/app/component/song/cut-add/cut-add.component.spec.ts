import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutAddComponent } from './cut-add.component';

describe('CutAddComponent', () => {
  let component: CutAddComponent;
  let fixture: ComponentFixture<CutAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
