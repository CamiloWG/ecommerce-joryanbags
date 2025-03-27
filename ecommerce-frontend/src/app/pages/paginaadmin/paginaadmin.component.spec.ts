import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaadminComponent } from './paginaadmin.component';

describe('PaginaadminComponent', () => {
  let component: PaginaadminComponent;
  let fixture: ComponentFixture<PaginaadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
