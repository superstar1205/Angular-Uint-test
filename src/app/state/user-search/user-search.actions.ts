import { Affiliates } from '../../shared/models/Affiliate';

export class SetUserSearchAction {
  static readonly type = '[UserSearch] Add item';
  constructor(public payload: Affiliates[]) { }
}

export class GetUserSearchAction {
  static readonly type = '[UserSearch] Get item';
}