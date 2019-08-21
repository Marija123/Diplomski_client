import { async, TestBed } from '@angular/core/testing';
import { AddChangeLinesComponent } from './add-change-lines.component';
describe('AddChangeLinesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddChangeLinesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddChangeLinesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-change-lines.component.spec.js.map