import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeVerificationComponent } from './code-verification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CodeVerificationComponent', () => {
  let component: CodeVerificationComponent;
  let fixture: ComponentFixture<CodeVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeVerificationComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule ],
      providers: [
        provideMockStore({ initialState: {} }), // forneça um estado inicial, se necessário
      ],
    });
    fixture = TestBed.createComponent(CodeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
