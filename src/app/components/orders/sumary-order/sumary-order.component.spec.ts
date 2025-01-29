import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryOrderComponent } from './sumary-order.component';

describe('SumaryOrderComponent', () => {
  let component: SumaryOrderComponent;
  let fixture: ComponentFixture<SumaryOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumaryOrderComponent]
    });
    fixture = TestBed.createComponent(SumaryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
