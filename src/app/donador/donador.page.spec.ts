import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonadorPage } from './donador.page';

describe('DonadorPage', () => {
  let component: DonadorPage;
  let fixture: ComponentFixture<DonadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DonadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
