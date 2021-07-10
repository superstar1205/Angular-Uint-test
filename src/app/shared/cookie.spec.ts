import { ReadAuthCookie, RemoveAuthCookie, SetAuthCookie } from "./cookie";
import jsCookies from 'js-cookie';

describe('Cookie', () => {
    beforeEach(() => {
        spyOn(jsCookies, 'set').and.callThrough();
    })

    it('set cookies', () => {
        SetAuthCookie('mock_token');
        expect(jsCookies.set).toHaveBeenCalled();
    })

    it('remove cookies', () => {
        spyOn(jsCookies, 'remove').and.callThrough();

        RemoveAuthCookie();

        expect(jsCookies.remove).toHaveBeenCalled();
    })

    it('read cookies', () => {
        spyOn(jsCookies, 'get').and.returnValue('cookies');

        ReadAuthCookie();

        expect(jsCookies.get).toHaveBeenCalled();
        expect(ReadAuthCookie()).toBeTruthy();
    })

    it('read cookies null', () => {
        spyOn(jsCookies, 'get').and.returnValue(undefined);

        ReadAuthCookie();

        expect(jsCookies.get).toHaveBeenCalled();
        expect(ReadAuthCookie()).toEqual(null);
    })
})