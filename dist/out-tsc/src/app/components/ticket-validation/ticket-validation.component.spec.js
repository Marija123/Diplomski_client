import { async, TestBed } from '@angular/core/testing';
import { TicketValidationComponent } from './ticket-validation.component';
describe('TicketValidationComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TicketValidationComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TicketValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ticket-validation.component.spec.js.map