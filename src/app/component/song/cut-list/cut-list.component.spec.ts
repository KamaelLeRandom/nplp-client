import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutListComponent } from './cut-list.component';

describe('CutListComponent', () => {
  let component: CutListComponent;
  let fixture: ComponentFixture<CutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
