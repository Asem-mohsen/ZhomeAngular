import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrroductsComponent } from './prroducts.component';

describe('PrroductsComponent', () => {
  let component: PrroductsComponent;
  let fixture: ComponentFixture<PrroductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrroductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrroductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
