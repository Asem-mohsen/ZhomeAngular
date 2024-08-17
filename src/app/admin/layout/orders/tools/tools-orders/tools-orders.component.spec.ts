import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOrdersComponent } from './tools-orders.component';

describe('ToolsOrdersComponent', () => {
  let component: ToolsOrdersComponent;
  let fixture: ComponentFixture<ToolsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
