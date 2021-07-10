import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetUserLogedAction,GetUserLogedAction } from './user-loged.actions';
import { User } from '../../shared/models/User';
import { UserLogedInitial } from '../InitialStates/UserLoged';

export class UserLogedStateModel {
  public user: User ;
}

const defaults = {
  user: UserLogedInitial
};

@State<UserLogedStateModel>({
  name: 'userLoged',
  defaults
})

@Injectable()
export class UserLogedState {

  @Selector()
  public static getUserLoged({userLoged}):User {
    return userLoged;
  }

  @Action(SetUserLogedAction)
  add({ getState, setState }: StateContext<UserLogedStateModel>, { payload }: SetUserLogedAction) {
    const state = getState();
    setState({ ...state.user, user:payload });
  }

  @Action(GetUserLogedAction)
  getUser({getState,setState}:StateContext<UserLogedStateModel>) : void {
    const state = getState();
    setState({ ...state });
  }
}
