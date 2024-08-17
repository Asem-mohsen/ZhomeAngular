import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlatfromComponent } from './create-platfrom.component';

describe('CreatePlatfromComponent', () => {
  let component: CreatePlatfromComponent;
  let fixture: ComponentFixture<CreatePlatfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlatfromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePlatfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
