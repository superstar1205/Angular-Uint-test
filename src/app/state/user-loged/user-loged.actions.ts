import { User } from '../../shared/models/User';


export class SetUserLogedAction {
  static readonly type = '[UserLoged] Add item';
  constructor(public payload: User) { }
}

export class GetUserLogedAction {
  static readonly type = '[UserLoged] Get item';
}