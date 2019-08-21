import { async, TestBed } from '@angular/core/testing';
import { RegAdminContComponent } from './reg-admin-cont.component';
describe('RegAdminContComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegAdminContComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RegAdminContComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=reg-admin-cont.component.spec.js.map