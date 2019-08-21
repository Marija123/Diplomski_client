import { async, TestBed } from '@angular/core/testing';
import { AddChangeTimetableComponent } from './add-change-timetable.component';
describe('AddChangeTimetableComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddChangeTimetableComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddChangeTimetableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-change-timetable.component.spec.js.map