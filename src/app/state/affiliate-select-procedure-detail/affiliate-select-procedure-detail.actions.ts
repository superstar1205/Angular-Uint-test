import { ProceduresDetail } from '../../shared/models/ProceduresDetail';

export class SetAffiliateSelectProcedureDetailAction {
  static readonly type = '[AffiliateSelectProcedureDetail] Add item';
  constructor(public payload: ProceduresDetail[]) { }
}

export class GetAffiliateSelectProcedureDetailAction {
  static readonly type = '[AffiliateSelectProcedureDetail] Get item';
}