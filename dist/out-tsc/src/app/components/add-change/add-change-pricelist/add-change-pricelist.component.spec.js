import { async, TestBed } from '@angular/core/testing';
import { AddChangePricelistComponent } from './add-change-pricelist.component';
describe('AddChangePricelistComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddChangePricelistComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddChangePricelistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-change-pricelist.component.spec.js.map