import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetUserSearchSelectAction,GetUserSearchSelectAction } from './user-search-select.actions';
import { Affiliates } from '../../shared/models/Affiliate';

export class UserSearchSelectStateModel {
  public affiliate: Affiliates;
}

const defaults = {
  affiliate: {}
};

@State<UserSearchSelectStateModel>({
  name: 'userSearchSelect',
  defaults
})
@Injectable()
export class UserSearchSelectState {
  @Action(SetUserSearchSelectAction)
  add({ getState, setState }: StateContext<UserSearchSelectStateModel>, { payload }: SetUserSearchSelectAction) {
    const state = getState();
    //setState({ items: [ ...state.items, payload ] });
    setState({ ...state.affiliate, affiliate:payload });
  }

  @Action(GetUserSearchSelectAction)
  getUser({getState,setState}:StateContext<GetUserSearchSelectAction>) : void {
    const state = getState();
    setState({ ...state });
  }
}
