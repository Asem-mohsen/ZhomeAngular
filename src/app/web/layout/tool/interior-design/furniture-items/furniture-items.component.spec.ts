import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureItemsComponent } from './furniture-items.component';

describe('FurnitureItemsComponent', () => {
  let component: FurnitureItemsComponent;
  let fixture: ComponentFixture<FurnitureItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FurnitureItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FurnitureItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
