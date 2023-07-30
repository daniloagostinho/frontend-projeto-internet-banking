import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeVerificationComponent } from './code-verification.component';

describe('CodeVerificationComponent', () => {
  let component: CodeVerificationComponent;
  let fixture: ComponentFixture<CodeVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeVerificationComponent]
    });
    fixture = TestBed.createComponent(CodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
