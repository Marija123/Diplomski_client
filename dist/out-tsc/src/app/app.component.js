import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
let AppComponent = class AppComponent {
    constructor(auth, elementRef) {
        this.auth = auth;
        this.elementRef = elementRef;
        this.title = 'client';
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e2e28';
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, ElementRef])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map