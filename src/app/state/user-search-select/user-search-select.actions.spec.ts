import { GetUserSearchSelectAction, SetUserSearchSelectAction } from "./user-search-select.actions"

describe('User search select actions', () => {
  it('SetUserSearchSelectAction action to be truthy', () => {
    expect(new SetUserSearchSelectAction({})).toBeTruthy();
  })

  it('GetUserSearchSelectAction action to be truthy', () => {
    expect(new GetUserSearchSelectAction()).toBeTruthy();
  })
})