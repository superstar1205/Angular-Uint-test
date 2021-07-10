import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { SetAffiliateSelectProcedureDetailAction,GetAffiliateSelectProcedureDetailAction } from './affiliate-select-procedure-detail.actions';
import { ProceduresDetail } from '../../shared/models/ProceduresDetail';


export class AffiliateSelectProcedureDetailStateModel {
  public detail: ProceduresDetail[];
}

const defaults = {
  detail: []
};

@State<AffiliateSelectProcedureDetailStateModel>({
  name: 'affiliateSelectProcedureDetail',
  defaults
})
@Injectable()
export class AffiliateSelectProcedureDetailState {
  @Action(SetAffiliateSelectProcedureDetailAction)
  add({ getState, setState }: StateContext<AffiliateSelectProcedureDetailStateModel>, { payload }: SetAffiliateSelectProcedureDetailAction) {
    const state = getState();
    //setState({ items: [ ...state.items, payload ] });
    setState({ ...state.detail, detail:payload });
  }

  @Action(GetAffiliateSelectProcedureDetailAction)
  getUser({getState,setState}:StateContext<GetAffiliateSelectProcedureDetailAction>) : void {
    const state = getState();
    setState({ ...state });
  }
}
