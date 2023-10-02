import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraLogPage } from './camera-log.page';

describe('CameraLogPage', () => {
  let component: CameraLogPage;
  let fixture: ComponentFixture<CameraLogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CameraLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
