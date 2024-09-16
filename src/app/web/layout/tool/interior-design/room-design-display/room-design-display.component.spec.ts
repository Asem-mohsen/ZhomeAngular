import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDesignDisplayComponent } from './room-design-display.component';

describe('RoomDesignDisplayComponent', () => {
  let component: RoomDesignDisplayComponent;
  let fixture: ComponentFixture<RoomDesignDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDesignDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomDesignDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
