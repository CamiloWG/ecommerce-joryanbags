import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminresumenComponent } from './adminresumen.component';

describe('AdminresumenComponent', () => {
  let component: AdminresumenComponent;
  let fixture: ComponentFixture<AdminresumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminresumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminresumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
