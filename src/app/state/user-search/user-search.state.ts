import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetUserSearchAction,GetUserSearchAction } from './user-search.actions';
import { Affiliates } from '../../shared/models/Affiliate';

export class UserSearchStateModel {
  public affiliates: Affiliates[];
}

const defaults = {
  affiliates: []
};

@State<UserSearchStateModel>({
  name: 'userSearch',
  defaults
})
@Injectable()
export class UserSearchState {
  @Action(SetUserSearchAction)
  add({ getState, setState }: StateContext<UserSearchStateModel>, { payload }: SetUserSearchAction) {
    const state = getState();
    // setState({ affiliates: [ ...state.affiliates, affiliates:payload ] });
    setState({ ...state.affiliates, affiliates:payload });
  }

  @Action(GetUserSearchAction)
  getUser({getState,setState}:StateContext<GetUserSearchAction>) : void {
    const state = getState();
    setState({ ...state });
  }
}
