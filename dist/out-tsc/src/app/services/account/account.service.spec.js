import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
describe('AccountService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(AccountService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=account.service.spec.js.map