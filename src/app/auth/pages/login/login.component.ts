import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthAzureService } from '../../services/auth/auth-azure.service';
import { Title } from '@angular/platform-browser';
import { AppConstants } from '../../../shared/constants';

import {DATA_LOGIN} from '../../../shared/data/mock_login';
import { AuthResponse, UserData } from '../../interfaces/interfaces';

import { SetAuthCookie } from '../../../shared/cookie';
import { EncodeData } from 'src/app/shared/storage-handler';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

import { Store } from '@ngxs/store';
import { SetUserLogedAction } from 'src/app/state/user-loged/user-loged.actions';

import JWT from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public status: string;
  public ShowLoading = true;
  public statusTitle: string;
  public statusText: string;
  loginForm: any;

  public DataLoginMock: AuthResponse = DATA_LOGIN;
  public DataLogin: any = {};
  private _user!: UserData;
  get user() {
    return {
      ...this._user
    };
  }
  constructor(
    public dialog: MatDialog,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private authAzureService: AuthAzureService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.status = 'Validando usuario, espere...';
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      text: this.statusText,
      title: this.statusTitle,
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }
  ngOnInit(): void {
    this.titleService.setTitle(`${AppConstants.AppName} ::: Login`);
    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (params.error) {
          this.ShowLoading = false;
          this.statusTitle = 'No tienes acceso al sistema';
          this.statusText = ``;
          this.openDialog();
        } else {
          const authorizationCode = (params === undefined || params.code === undefined) ? '' : params.code;
          // console.log(authorizationCode)
          this.LoginAzure(authorizationCode);
        }
      });
    }, 3000);

    this.loginForm = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      password: [{value: '', disabled: true}, Validators.required],
    });
  }
  LoginAzure = async (authorizationCode) => {
    // console.log(authorizationCode)
    if (await this.authAzureService.validateAuthFlow({
        authorization_code: authorizationCode
      })) {
      // id_token
      const token = localStorage.getItem('id_token');
      // SetAuthCookie(token);
      const decodedToken: any = JWT(token);
      const userObj = {
        code!: decodedToken.sam_account_name!,
        name!: `${decodedToken.name}`!,
        email!: decodedToken.preferred_username!,
        id!: decodedToken.sam_account_name!,
      };
      //// console.log(userObj)
      // EncodeData(AppConstants.UserDataLS,userObj);
      this.store.dispatch(new SetUserLogedAction(userObj));
      this._user = userObj;
      this.router.navigateByUrl('/dashboard/app-list');
    }
  }

  isValidField = (field: string): string => {
    const validatedField = this.loginForm.get(field);
    return (!validatedField.valid && validatedField.touched) ?
      'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  SubmitLoginForm = () => {
    this.activatedRoute.queryParams.subscribe((params) => {
      const authorizationCode = (params === undefined || params.code === undefined) ? '' : params.code;
      // console.log(authorizationCode)
      this.LoginAzure(authorizationCode);
    });
  }
  LoginMock = () => {
    // SetAuthCookie(this.DataLoginMock.token!);
    // EncodeData(AppConstants.UserDataLS,this.DataLoginMock.userData);
    this._user = {
      code!: this.DataLoginMock.userData.id!,
      name!: `${this.DataLoginMock.userData.nombre} ${this.DataLoginMock.userData.apellido}`!,
      email!: this.DataLoginMock.userData.usuario!,
      id!: this.DataLoginMock.userData.id!,
    };
  }
}

