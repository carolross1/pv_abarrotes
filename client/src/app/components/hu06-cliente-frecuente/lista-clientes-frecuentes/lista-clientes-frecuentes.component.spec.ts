import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesFrecuentesComponent } from './lista-clientes-frecuentes.component';

describe('ListaClientesFrecuentesComponent', () => {
  let component: ListaClientesFrecuentesComponent;
  let fixture: ComponentFixture<ListaClientesFrecuentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaClientesFrecuentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaClientesFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
