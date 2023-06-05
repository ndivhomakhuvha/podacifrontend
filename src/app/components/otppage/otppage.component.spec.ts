import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPPageComponent } from './otppage.component';

describe('OTPPageComponent', () => {
  let component: OTPPageComponent;
  let fixture: ComponentFixture<OTPPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTPPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OTPPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
