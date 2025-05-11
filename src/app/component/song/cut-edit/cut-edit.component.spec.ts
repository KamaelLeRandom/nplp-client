import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutEditComponent } from './cut-edit.component';

describe('CutEditComponent', () => {
  let component: CutEditComponent;
  let fixture: ComponentFixture<CutEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
