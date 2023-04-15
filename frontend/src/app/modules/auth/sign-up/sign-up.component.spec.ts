import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from '@modules/auth/sign-up/sign-up.component';
import { AuthService } from '@core/services/auth/auth.service';
import { ErrorService } from '@core/services/error.service';
import { IUserDto } from '@shared/types/user/user.dto.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderService } from '@modules/header/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import SpyObj = jasmine.SpyObj;

describe('SignUpComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let authSpy: SpyObj<Pick<AuthService, 'signUp'>>;
  let errorsHandlerSpy: SpyObj<Pick<ErrorService, 'showErrorNotification'>>;
  let headerSpy: SpyObj<Pick<HeaderService, 'setTitle'>>;
  let routerSpy: SpyObj<Pick<Router, 'navigate'>>;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  const userDtoStub: Readonly<IUserDto> = {
    avatarSrc: '',
    id: '',
    createdAt: '',
    email: '',
    firstName: '',
    lastName: null,
    phone: null,
    about: null,
    workType: null,
    experience: null,
    languages: [],
    keywords: [''],
    hourlyRate: null,
  };

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['signup']);
    errorsHandlerSpy = jasmine.createSpyObj('ErrorsService', ['handle']);
    headerSpy = jasmine.createSpyObj('HeaderService', ['setTitle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: ErrorService, useValue: errorsHandlerSpy},
        {provide: HeaderService, useValue: headerSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: null}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    fixture.detectChanges();
    firstNameInput = fixture.nativeElement.querySelector('[data-qa="first-name-input"]');
    lastNameInput = fixture.nativeElement.querySelector('[data-qa="last-name-input"]');
    emailInput = fixture.nativeElement.querySelector('[data-qa="email-input"]');
    passwordInput = fixture.nativeElement.querySelector('[data-qa="password-input"]');
    submitButton = fixture.nativeElement.querySelector('[data-qa="submit-button"]');
  });

  it('should set sign up <title>', () => {
    expect(headerSpy.setTitle).toHaveBeenCalledWith('Sign up');
  });

  const fillFormAndSubmit = () => {
    const formValue = {
      firstName: 'Sophie',
      lastName: 'Pav',
      email: 'test@email.com',
      password: 'qwerty123'
    };

    firstNameInput.value = formValue.firstName;
    firstNameInput.dispatchEvent(new Event('input'));

    lastNameInput.value = formValue.lastName;
    lastNameInput.dispatchEvent(new Event('input'));

    emailInput.value = formValue.email;
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = formValue.password;
    passwordInput.dispatchEvent(new Event('input'));

    submitButton.click();
    fixture.detectChanges();

    return formValue;
  };

  it('should call signUp and navigate to signIn on valid form values', () => {
    authSpy.signUp.and.returnValue(of(userDtoStub));
    const formValue = fillFormAndSubmit();
    expect(authSpy.signUp).toHaveBeenCalledWith(formValue);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['../sign-in'], {relativeTo: null});
  });

  it('shouldn\'t call signUp on invalid form values', () => {
    emailInput.value = 'test.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'qwerty111';
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authSpy.signUp).not.toHaveBeenCalled();
  });

  it('should call ErrorsService#handle in case of error', () => {
    const error = new HttpErrorResponse({error: {message: 'Something went wrong'}});
    authSpy.signUp.and.returnValue(new Observable(subscriber => subscriber.error(error)));

    fillFormAndSubmit();

    expect(errorsHandlerSpy.showErrorNotification).toHaveBeenCalledWith(error);
  });
});
