import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeComponent } from './home-type.component';

describe('HomeTypeComponent', () => {
  let component: HomeTypeComponent;
  let fixture: ComponentFixture<HomeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
