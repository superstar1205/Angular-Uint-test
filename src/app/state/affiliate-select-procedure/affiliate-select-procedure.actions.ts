import { Procedures } from '../../shared/models/Procedures';


export class SetAffiliateSelectProcedureAction {
  static readonly type = '[AffiliateSelectProcedure] Add item';
  constructor(public payload: Procedures[]) { }
}

export class GetAffiliateSelectProcedureAction {
  static readonly type = '[AffiliateSelectProcedure] Get item';
}