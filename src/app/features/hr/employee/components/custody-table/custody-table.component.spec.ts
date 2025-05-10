import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodyTableComponent } from './custody-table.component';

describe('CustodyTableComponent', () => {
  let component: CustodyTableComponent;
  let fixture: ComponentFixture<CustodyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustodyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
