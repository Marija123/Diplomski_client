import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
let EditProfileComponent = class EditProfileComponent {
    constructor(route, router, auth) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.requestUserInfo();
    }
    ngOnInit() {
    }
    requestUserInfo() {
        //this.usersService.getUserClaims().subscribe(claims => {
        this.auth.profile().subscribe(data => {
            this.user = data;
            let str = this.user.Birthday;
            this.user.Birthday = str.split('T')[0];
            console.log(this.user);
        });
        // });
    }
};
EditProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-profile',
        templateUrl: './edit-profile.component.html',
        styleUrls: ['./edit-profile.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, AuthenticationService])
], EditProfileComponent);
export { EditProfileComponent };
//# sourceMappingURL=edit-profile.component.js.map