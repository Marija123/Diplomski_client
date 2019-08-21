import { async, TestBed } from '@angular/core/testing';
import { AddChangeStationsComponent } from './add-change-stations.component';
describe('AddChangeStationsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddChangeStationsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddChangeStationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-change-stations.component.spec.js.map