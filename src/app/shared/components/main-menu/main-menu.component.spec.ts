import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { MainMenuComponent } from './main-menu.component';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';

const appConfig = require('src/assets/configs/config.json');

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(fakeAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'auth',
          component: LoginComponent
        }]),
        NgxsModule.forRoot()
      ],
      declarations: [ MainMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_CONFIG, useValue: appConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ShowNotifications() should change variable', () => {
    component.ShowNotifications();

    expect(component.ShowListNotifications).toBeTruthy();
  });

  it('logout() should navigate user', () => {
    spyOn(component, 'logout').and.callThrough();
    spyOn(localStorage, 'clear').and.callThrough();

    component.logout();

    expect(component.logout).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
  });

});
