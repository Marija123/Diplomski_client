import { async, TestBed } from '@angular/core/testing';
import { AddChangeVehicleComponent } from './add-change-vehicle.component';
describe('AddChangeVehicleComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddChangeVehicleComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddChangeVehicleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-change-vehicle.component.spec.js.map