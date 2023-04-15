import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth/auth.service';
import { SignInComponent } from '@modules/auth/sign-in/sign-in.component';
import { ErrorService } from '@core/services/error.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from '@modules/header/header.service';
import SpyObj = jasmine.SpyObj;

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let authSpy: SpyObj<Pick<AuthService, 'signIn'>>;
  let errorsHandlerSpy: SpyObj<Pick<ErrorService, 'showErrorNotification'>>;
  let headerSpy: SpyObj<Pick<HeaderService, 'setTitle'>>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['signIn']);
    errorsHandlerSpy = jasmine.createSpyObj('ErrorsService', ['showErrorNotification']);
    headerSpy = jasmine.createSpyObj('HeaderService', ['setTitle']);

    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: ErrorService, useValue: errorsHandlerSpy},
        {provide: HeaderService, useValue: headerSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    fixture.detectChanges();
    emailInput = fixture.nativeElement.querySelector('[data-qa="email-input"]');
    passwordInput = fixture.nativeElement.querySelector('[data-qa="password-input"]');
    submitButton = fixture.nativeElement.querySelector('[data-qa="submit-button"]');
  });

  it('should set login <title>', () => {
    expect(headerSpy.setTitle).toHaveBeenCalledWith('Sign in');
  });

  const fillFormAndSubmit = () => {
    const formValue = {
      email: 'test123@mail.com',
      password: 'qwerty'
    };

    emailInput.value = formValue.email;
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = formValue.password;
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    return formValue;
  };

  it('should call signin on valid form values', () => {
    authSpy.signIn.and.returnValue(EMPTY);
    const formValue = fillFormAndSubmit();
    expect(authSpy.signIn).toHaveBeenCalledWith(formValue);
  });

  it('shouldn\'t call signin on invalid form values', () => {
    emailInput.value = 'test1242.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'qwerty';
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authSpy.signIn).not.toHaveBeenCalled();
  });

  it('should call ErrorsService#handle in case of error', () => {
    const error = new HttpErrorResponse({error: {message: 'Something went wrong'}});
    authSpy.signIn.and.returnValue(new Observable(subscriber => subscriber.error(error)));

    fillFormAndSubmit();

    expect(errorsHandlerSpy.showErrorNotification).toHaveBeenCalledWith(error);
  });
});
