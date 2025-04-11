import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontenidoComponent } from './admincontenido.component';

describe('AdmincontenidoComponent', () => {
  let component: AdmincontenidoComponent;
  let fixture: ComponentFixture<AdmincontenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincontenidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincontenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
