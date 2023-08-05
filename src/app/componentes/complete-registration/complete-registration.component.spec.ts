import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegistrationComponent } from './complete-registration.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CompleteRegistrationComponent', () => {
  let component: CompleteRegistrationComponent;
  let fixture: ComponentFixture<CompleteRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteRegistrationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: {} }), // forneça um estado inicial, se necessário
      ],
    });
    fixture = TestBed.createComponent(CompleteRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
