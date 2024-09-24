import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionPagoComponent } from './direccion-pago.component';

describe('DireccionPagoComponent', () => {
  let component: DireccionPagoComponent;
  let fixture: ComponentFixture<DireccionPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DireccionPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DireccionPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
