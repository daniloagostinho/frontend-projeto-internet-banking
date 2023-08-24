import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecovertPasswordComponent } from './recover-password.component';


describe('RecovertPasswordComponent', () => {
  let component: RecovertPasswordComponent;
  let fixture: ComponentFixture<RecovertPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecovertPasswordComponent]
    });
    fixture = TestBed.createComponent(RecovertPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
