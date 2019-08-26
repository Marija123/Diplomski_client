import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { NgForm } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  user : any;
  selectedImage: any;
  userId : string = "";
  pass: string = "";
  allPassTypes = [];
  constructor(private route: ActivatedRoute, private router:Router, public auth: AuthenticationService, public acou: AccountService) 
  { 
    this.acou.getPassengerTypes().subscribe(data => {
      this.allPassTypes = data;
      this.requestUserInfo();
    })
   
    
  }

  ngOnInit() {
  }
  requestUserInfo(){
      this.auth.profile().subscribe(data => {
        
          this.user = data;   
          this.allPassTypes.forEach(element => {
            if(element._id == this.user.passengerType){
                this.pass = element.name;
            }
          });
          this.userId = this.user._id;
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
   
let fd = new FormData();

fd.append('Id', userr.Id);
fd.append('name', userr.Name);
fd.append('surname',userr.Surname);
fd.append('address', userr.Address);
fd.append('email', userr.Email);
fd.append('birthday', userr.Birthday.toString());

if(this.selectedImage != undefined && this.selectedImage != null)
{
  fd.append('file',this.selectedImage);


}

this.auth.edit(fd).subscribe(data =>{
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

 }
  Button2(pass: any, form:NgForm )
  {
    let errorss = [];
    let formbld = new FormData();
    formbld.append('oldPassword', pass.OldPassword);
    formbld.append('newPassword', pass.NewPassword);
    formbld.append('confirmPassword', pass.ConfirmPassword);
    formbld.append('id',this.userId);

    this.auth.editPassword(formbld).subscribe(data=>{
      window.alert("You successfully edited you account!");
      ProfileComponent.returned.next(false);
      this.router.navigate(['profile']);
    }, err =>
    {
      
      window.alert(err.error.message);
    });
  }

  onFileSelected(event){
    this.selectedImage = <File>event.target.files[0];
   
  }
}

