import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartbillComponent } from './cartbill.component';

describe('CartbillComponent', () => {
  let component: CartbillComponent;
  let fixture: ComponentFixture<CartbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartbillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
