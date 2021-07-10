import 'zone.js/dist/zone-testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { APP_CONFIG } from 'src/app/injectors';
import { AppListComponent } from './app-list.component';
import { MainMenuComponent } from '../../../shared/components/main-menu/main-menu.component';

const appConfig = require('src/assets/configs/config.json');

describe('AppListComponent', () => {
  let component: AppListComponent;
  let fixture: ComponentFixture<AppListComponent>;

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        NgxsModule.forRoot()
      ],
      declarations: [ AppListComponent,MainMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_CONFIG, useValue: appConfig },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
