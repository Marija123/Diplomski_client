import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { TokenPayload } from 'src/app/model/tokenPayload';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

//, private usersService: UserProfileService, private fileServ: FileUploadService, private notificationServ: NotificationService

  user : any;
  selectedImage: any;
  constructor(private route: ActivatedRoute, private router:Router, public auth: AuthenticationService) 
  { 
  
    this.requestUserInfo()
  }

  ngOnInit() {
  }
  requestUserInfo(){
    //this.usersService.getUserClaims().subscribe(claims => {
      this.auth.profile().subscribe(data => {
        
          this.user = data;    
          let str = this.user.birthday;
          this.user.birthday = str.split('T')[0];
          console.log(this.user);    
      });
     
   // });
  }

  Button1(userr: RegModel, form: NgForm)
  {
    userr.Id = this.user._id;
    let errorss = [];
    
    // let u : TokenPayload= {
    //   email: userr.Email,
    //   name: userr.Name,
    //   password: "",
    //   surname: userr.Surname,
    //   address: userr.Address,
    //   birthday: userr.Birthday,
    //   id: this.user._id
    // };

    //if (this.selectedImage == undefined){
      this.auth.edit(userr).subscribe(data =>{
      if(localStorage.getItem('name') != this.user.email)
      {
       localStorage.setItem('name', this.user.email);
      }
      window.alert("You successfully edited you account!");
      ProfileComponent.returned.next(false);
        this.router.navigate(['profile']);
        console.log("WTFFFFFFFFF");
      }, err =>
      {
        for(var key in err.error.ModelState)
        {
          for(var i = 0; i < err.error.ModelState[key].length; i++)
          {
              errorss.push(err.error.ModelState[key][i]);
          }
        }
        console.log(errorss);
        window.alert(errorss);
      } );
    
    //}else{
          // this.fileServ.uploadFile(this.selectedImage)
          // .subscribe(data => {      
          //   //alert("Image uploaded.");  
          //   this.usersService.edit(userr).subscribe(data =>
          //     {
          //       if(localStorage.getItem('name') != this.user.Email)
          //       {
          //        localStorage.setItem('name', this.user.Email);
          //       }
          //       if(localStorage.getItem('role') == 'AppUser'){
          //         this.notificationServ.sendNotificationToController();
          //       }
          //       window.alert("You successfully edited you account!");
          //       ProfileComponent.returned.next(false);
          //       this.router.navigate(['profile']);
                
          //     }, err =>
          //     {
          //       for(var key in err.error.ModelState)
          //       {
          //         for(var i = 0; i < err.error.ModelState[key].length; i++)
          //         {
          //           errorss.push(err.error.ModelState[key][i]);
          //         }
          //       }
          //       console.log(errorss);
          //       window.alert(errorss);
          //     }
          //   );
            
          // }, err =>
          // {
          //   for(var key in err.error.ModelState)
          //   {
          //     for(var i = 0; i < err.error.ModelState[key].length; i++)
          //     {
          //       errorss.push(err.error.ModelState[key][i]);
          //     }
          //   }
          //   console.log(errorss);
          //   window.alert(errorss);
          // });
        //}
   
  }
  // Button2(pass: ChangePasswordModel, form:NgForm )
  // {
  //   let errorss = [];
  //   this.usersService.editPassword(pass).subscribe(data=>{
  //     window.alert("You successfully edited you account!");
  //     ProfileComponent.returned.next(false);
  //     this.router.navigate(['profile']);
  //   }, err =>
  //   {
  //     for(var key in err.error.ModelState)
  //     {
  //       for(var i = 0; i < err.error.ModelState[key].length; i++)
  //       {
  //         errorss.push(err.error.ModelState[key][i]);
  //       }
  //     }
  //     console.log(errorss);
  //     window.alert(errorss);
  //   });
  // }

  // onFileSelected(event){
  //   this.selectedImage = event.target.files;
   
  // }
}

