import { DecodeData, DeleteAllStorage, DeleteStorage, EncodeData } from "./storage-handler";

describe('Storage Handler', () => {
    it('DecodeData()', () => {
        expect(DecodeData('data')).toBeFalsy();
    })

    it('DecodeData() with data in storage', () => {
        spyOn(localStorage, 'getItem').and.returnValue('eyJhIjoxfQ==');

        expect(DecodeData('SGVsbG8gV29ybGQh')).toBeTruthy();
    })

    it('EncodeData() should set item in storage', () => {
        spyOn(localStorage, 'setItem').and.callThrough();

        EncodeData('name', 'SGVsbG8gV29ybGQh')

        expect(localStorage.setItem).toHaveBeenCalled();
    })

    it('DeleteStorage() should delete item in storage', () => {
        spyOn(localStorage, 'removeItem').and.callThrough();

        DeleteStorage('name');

        expect(localStorage.removeItem).toHaveBeenCalled();
        expect(DeleteStorage('name')).toEqual(true);
    })

    it('DeleteAllStorage() should delete all item in storage', () => {
        spyOn(localStorage, 'clear').and.callThrough();

        DeleteAllStorage();

        expect(localStorage.clear).toHaveBeenCalled();
    })
})