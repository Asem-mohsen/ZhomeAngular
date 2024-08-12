import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraturesComponent } from './fratures.component';

describe('FraturesComponent', () => {
  let component: FraturesComponent;
  let fixture: ComponentFixture<FraturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
