import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopedidoComponent } from './infopedido.component';

describe('InfopedidoComponent', () => {
  let component: InfopedidoComponent;
  let fixture: ComponentFixture<InfopedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfopedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfopedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
