import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutItemComponent } from './cut-item.component';

describe('CutItemComponent', () => {
  let component: CutItemComponent;
  let fixture: ComponentFixture<CutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
