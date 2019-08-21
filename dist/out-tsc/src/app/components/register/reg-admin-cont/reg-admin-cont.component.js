import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/model/validation/password-validator';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
let RegAdminContComponent = class RegAdminContComponent {
    //private notificationServ: NotificationService,
    constructor(fb, accountService, router) {
        this.fb = fb;
        this.accountService = accountService;
        this.router = router;
        this.registerForm = this.fb.group({
            Password: ['',
                [Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
            ConfirmPassword: ['',
                Validators.required],
            Email: ['',
                [Validators.email]],
            Name: ['',
                Validators.required],
            Surname: ['',
                Validators.required],
            Address: ['',
                Validators.required],
            Birthday: ['', Validators.required],
            Role: ['Admin', Validators.required]
        }, { validators: ConfirmPasswordValidator });
        this.credentials = {
            email: '',
            name: '',
            password: '',
            surname: '',
            address: '',
            birthday: new Date(),
            image: '',
            activated: '',
            role: '',
            passengerType: ''
        };
    }
    get f() {
        return this.registerForm.controls;
    }
    ngOnInit() {
    }
    register() {
        this.accountService.register(this.credentials).subscribe(() => {
            this.router.navigateByUrl('/login');
        }, (err) => {
            console.error(err);
        });
    }
    Button1() {
        let regModel = this.registerForm.value;
        let formData = new FormData();
        this.credentials.name = this.registerForm.value.Name;
        this.credentials.surname = this.registerForm.value.Surname;
        this.credentials.email = this.registerForm.value.Email;
        this.credentials.password = this.registerForm.value.Password;
        this.credentials.address = this.registerForm.value.Address;
        this.credentials.birthday = this.registerForm.value.Birthday;
        this.credentials.role = this.registerForm.value.Role;
        regModel.Activated = "PENDING";
        this.register();
        // this.accountService.register(regModel).subscribe(
        //   ret => {
        //     this.serverErrors = [];
        //     this.notificationServ.sendNotification();
        //     this.router.navigateByUrl('/signin');
        //   },
        //   err => {
        //     console.log(err);
        //     window.alert(err.error.ModelState[""]);
        //     this.serverErrors = err.error.ModelState[""]
        //   }
        // );
    }
};
RegAdminContComponent = tslib_1.__decorate([
    Component({
        selector: 'app-reg-admin-cont',
        templateUrl: './reg-admin-cont.component.html',
        styleUrls: ['./reg-admin-cont.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, AuthenticationService, Router])
], RegAdminContComponent);
export { RegAdminContComponent };
//# sourceMappingURL=reg-admin-cont.component.js.map