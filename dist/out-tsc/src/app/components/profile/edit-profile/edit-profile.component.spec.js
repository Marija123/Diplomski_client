import { async, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
describe('EditProfileComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditProfileComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-profile.component.spec.js.map