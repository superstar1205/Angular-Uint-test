import { Affiliates } from '../../shared/models/Affiliate';

export class SetUserSearchSelectAction {
  static readonly type = '[UserSearchSelect] Add item';
  constructor(public payload: Affiliates) { }
}

export class GetUserSearchSelectAction {
  static readonly type = '[UserSearchSelect] Get item';
}