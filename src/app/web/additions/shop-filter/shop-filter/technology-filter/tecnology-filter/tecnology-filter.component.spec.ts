import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologyFilterComponent } from './tecnology-filter.component';

describe('TecnologyFilterComponent', () => {
  let component: TecnologyFilterComponent;
  let fixture: ComponentFixture<TecnologyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnologyFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnologyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
