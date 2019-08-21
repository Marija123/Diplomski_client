import * as tslib_1 from "tslib";
var ProfileComponent_1;
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
let ProfileComponent = ProfileComponent_1 = class ProfileComponent {
    constructor(auth, router, route) {
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.otvorenEdit = false;
        this.accBool = false;
        this.nijeUser = false;
        this.birt = "";
        ProfileComponent_1.returned.subscribe(res => {
            this.otvorenEdit = false;
            this.accBool = false;
            this.nijeUser = false;
            this.provera();
            // this.requestUserInfo(); // this populates an array
        });
        this.navigationSubscription = this.router.events.subscribe((e) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.otvorenEdit = false;
                this.accBool = false;
                this.nijeUser = false;
                this.provera();
                this.requestUserInfo();
            }
        });
    }
    provera() {
        var _activeChild = this.route.children.length;
        if (_activeChild != 0) {
            console.log("uslo ovdeee");
            this.otvorenEdit = true;
            this.accBool = false;
            this.nijeUser = false;
        }
        else {
            this.otvorenEdit = false;
            this.accBool = false;
            this.nijeUser = false;
        }
    }
    ngOnInit() {
        this.provera();
        // this.auth.profile().subscribe(user => {
        //   this.details = user;
        // }, (err) => {
        //   console.error(err);
        // });
    }
    requestUserInfo() {
        // this.usersService.getUserClaims().subscribe(claims => {
        // this.auth.profile().subscribe(user => {
        //   this.details = user;
        // }, (err) => {
        //   console.error(err);
        // });
        this.auth.profile().subscribe(data => {
            this.user = data;
            let d = new Date(this.user.birthday);
            let mesec = d.getMonth() + 1;
            this.birt = "";
            this.birt = this.birt + d.getDate().toString() + ".";
            this.birt = this.birt + mesec.toString() + ".";
            this.birt = this.birt + d.getFullYear().toString() + ".";
            this.user.activated = "NOT_ACTIVATED";
            //  if(localStorage.getItem('role') == 'AppUser')
            //  {
            //    this.nijeUser = false;
            //    if(this.user.PassengerTypeId == 3)
            //    {
            //      this.nijeUser = true;
            //    }
            //  }
            //  else{
            //    this.nijeUser = true;
            //  }
            //  if(this.user.Activated == "DECLINED")  
            //  {
            //    this.accBool = true;
            //  } 
            //  else
            //  {
            //    this.accBool = false;
            //  } 
            //  console.log(this.user);    
        }, err => {
            window.alert(err.error);
            console.log(err);
        });
        //  });
    }
    Edit() {
        this.otvorenEdit = true;
        this.router.navigate(['../profile/edit'], { relativeTo: this.route });
    }
    Resend() {
        let kor = localStorage.getItem('name');
        // let m : ModelHelperAuthorization = new ModelHelperAuthorization("");
        // m.Id = kor;
        // this.usersService.resendReqest(m).subscribe(data =>
        //   {
        //     window.alert("Request successfully sent.");
        //     this.requestUserInfo();
        //   });
    }
    ngOnDestroy() {
        // avoid memory leaks here by cleaning up after ourselves. If we  
        // don't then we will continue to run our initialiseInvites()   
        // method on every navigationEnd event.
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }
};
ProfileComponent.returned = new Subject();
ProfileComponent = ProfileComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router, ActivatedRoute])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map