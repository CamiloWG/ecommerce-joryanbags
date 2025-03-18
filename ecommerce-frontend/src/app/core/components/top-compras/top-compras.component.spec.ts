import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopComprasComponent } from './top-compras.component';

describe('TopComprasComponent', () => {
  let component: TopComprasComponent;
  let fixture: ComponentFixture<TopComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
