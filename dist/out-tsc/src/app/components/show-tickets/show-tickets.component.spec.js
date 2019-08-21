import { async, TestBed } from '@angular/core/testing';
import { ShowTicketsComponent } from './show-tickets.component';
describe('ShowTicketsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowTicketsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ShowTicketsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=show-tickets.component.spec.js.map