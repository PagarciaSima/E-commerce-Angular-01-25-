import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateogryListComponent } from './cateogry-list.component';

describe('CateogryListComponent', () => {
  let component: CateogryListComponent;
  let fixture: ComponentFixture<CateogryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateogryListComponent]
    });
    fixture = TestBed.createComponent(CateogryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
