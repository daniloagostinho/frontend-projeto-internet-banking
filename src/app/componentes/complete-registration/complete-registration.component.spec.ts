import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegistrationComponent } from './complete-registration.component';

describe('CompleteRegistrationComponent', () => {
  let component: CompleteRegistrationComponent;
  let fixture: ComponentFixture<CompleteRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteRegistrationComponent]
    });
    fixture = TestBed.createComponent(CompleteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
