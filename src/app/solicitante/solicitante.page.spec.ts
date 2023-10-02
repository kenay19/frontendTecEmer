import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitantePage } from './solicitante.page';

describe('SolicitantePage', () => {
  let component: SolicitantePage;
  let fixture: ComponentFixture<SolicitantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
