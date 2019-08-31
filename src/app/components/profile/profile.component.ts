import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserDetails, AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  details: UserDetails;

  user: any;
  otvorenEdit: boolean = false;
  accBool : boolean = false;
  nijeUser : boolean = false;
  birt: string = "";
  navigationSubscription;
  public static returned: Subject<any> = new Subject();
  constructor(private auth: AuthenticationService,  private router: Router, private route: ActivatedRoute, public acc : AccountService) {
    ProfileComponent.returned.subscribe(res => {
      this.otvorenEdit = false;
      this.accBool = false;
      this.nijeUser = false;
      this.provera();
      
   });

   this.navigationSubscription = this.router.events.subscribe((e: any) => {
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
      if (_activeChild!=0) {
        console.log("uslo ovdeee")
         this.otvorenEdit = true;
         this.accBool  = false;
         this.nijeUser = false;
      }
      else
      {
        this.otvorenEdit = false;
        this.accBool  = false;
        this.nijeUser = false;
      }
  }

  ngOnInit() {    

    this.provera();

  }

  requestUserInfo(){
   
      this.auth.profile().subscribe(data => {
         
           this.user = data;
           let d : Date = new Date(this.user.birthday);
           let mesec : number = d.getMonth() + 1;
           this.birt = "";
           this.birt = this.birt+ d.getDate().toString() + ".";
           this.birt = this.birt+ mesec.toString() + ".";
           this.birt= this.birt + d.getFullYear().toString() + "." ;
 
           if(localStorage.getItem('role') == 'AppUser')
           {
             this.nijeUser = false;
           }
           else{
             this.nijeUser = true;
           }
           if(this.user.activated == "DECLINED")  
           {
             this.accBool = true;
           } 
           else
           {
             this.accBool = false;
           } 
           console.log(this.user);    
         },
         err =>
         {
           window.alert(err.error);
           console.log(err);
         });
      
   }
 


  Edit(){
    this.otvorenEdit = true;
    this.router.navigate(['../profile/edit'], {relativeTo: this.route});
  }

  Resend(){
    let kor = localStorage.getItem('name');
   let fd = new FormData();
   fd.append('email', kor);
    this.acc.resendReqest(fd).subscribe(data =>
      {
        window.alert("Request successfully sent.");
        this.requestUserInfo();
      }, 
      err => {
        window.alert(err.error.message);
      });
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
}
