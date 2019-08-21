import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/model/validation/password-validator';
import { AccountService } from 'src/app/services/account/account.service';
let RegisterComponent = class RegisterComponent {
    constructor(auth, router, fb, accountService) {
        this.auth = auth;
        this.router = router;
        this.fb = fb;
        this.accountService = accountService;
        this.types = [];
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
            PassengerType: ['Regular', Validators.required]
        }, { validators: ConfirmPasswordValidator });
        this.selectedImage = null;
        this.credentials = {
            email: '',
            name: '',
            password: '',
            surname: '',
            address: '',
            birthday: new Date(),
            image: '',
            activated: '',
            role: 'AppUser',
            passengerType: ''
        };
        this.accountService.getPassengerTypes().subscribe(data => {
            this.types = data;
            console.log("Tipovi putnika: ", this.types);
        }, err => {
            console.log(err);
        });
    }
    onFileSelected(event) {
        this.selectedImage = event.target.files;
    }
    get f() {
        return this.registerForm.controls;
    }
    ngOnInit() {
    }
    register() {
        this.auth.register(this.credentials).subscribe(() => {
            this.router.navigateByUrl('/login');
        }, (err) => {
            console.error(err);
        });
    }
    Button() {
        this.credentials.name = this.registerForm.value.Name;
        this.credentials.surname = this.registerForm.value.Surname;
        this.credentials.email = this.registerForm.value.Email;
        this.credentials.password = this.registerForm.value.Password;
        this.credentials.address = this.registerForm.value.Address;
        this.credentials.birthday = this.registerForm.value.Birthday;
        this.credentials.passengerType = this.registerForm.value.PassengerType;
        this.credentials.role = "AppUser";
        if (this.selectedImage == undefined || this.selectedImage == null) {
            this.credentials.activated = "NOT ACTIVATED";
            console.log("korisnik kog saljem: ", this.credentials);
            this.register();
        }
        else {
            this.credentials.activated = "PENDING";
            console.log("korisnik kog saljem: ", this.credentials);
            this.register();
            // this.fileUploadService.uploadFile(this.selectedImage)
            //    .subscribe(data => { 
            //     this.accountService.register(regModel).subscribe(
            //       ret => {
            //         this.serverErrors = [];
            //         console.log("ret", ret);
            //         if(ret == "sve je ok")
            //         {
            //           this.notificationServ.sendNotificationToController();
            //           this.router.navigateByUrl('/signin');
            //         }
            //         else
            //         {
            //           console.log("nesto nece d posalje notifikaciju");
            //           this.router.navigateByUrl('/signin');
            //         }
            //       },
            //       err => {
            //         console.log(err);
            //         window.alert(err.error.ModelState[""]);
            //         this.serverErrors = err.error.ModelState[""]
            //       }
            //     );
            //    },
            //    err => {
            //     window.alert(err.error);
            //    });
        }
    }
};
RegisterComponent = tslib_1.__decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router, FormBuilder, AccountService])
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map