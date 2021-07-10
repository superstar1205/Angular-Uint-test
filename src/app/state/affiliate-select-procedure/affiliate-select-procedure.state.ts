import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetAffiliateSelectProcedureAction,GetAffiliateSelectProcedureAction } from './affiliate-select-procedure.actions';
import { Procedures } from '../../shared/models/Procedures';


export class AffiliateSelectProcedureStateModel {
  public procedures: Procedures[];
}

const defaults = {
  procedures: []
};

@State<AffiliateSelectProcedureStateModel>({
  name: 'affiliateSelectProcedure',
  defaults
})
@Injectable()
export class AffiliateSelectProcedureState {
  @Action(SetAffiliateSelectProcedureAction)
  add({ getState, setState }: StateContext<AffiliateSelectProcedureStateModel>, { payload }: SetAffiliateSelectProcedureAction) {
    const state = getState();
    //setState({ items: [ ...state.items, payload ] });
    setState({ ...state.procedures, procedures:payload });
  }

  @Action(GetAffiliateSelectProcedureAction)
  getUser({getState,setState}:StateContext<GetAffiliateSelectProcedureAction>) : void {
    const state = getState();
    setState({ ...state });
  }
}
