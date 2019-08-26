import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/model/validation/password-validator';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegModel } from 'src/app/model/regModel';
import { TokenPayload } from 'src/app/model/tokenPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-admin-cont',
  templateUrl: './reg-admin-cont.component.html',
  styleUrls: ['./reg-admin-cont.component.css']
})
export class RegAdminContComponent implements OnInit {

  serverErrors: string[];
  registerForm = this.fb.group({
   
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
  },
  { validators: ConfirmPasswordValidator }
   );


  get f() 
  {
     return this.registerForm.controls; 
  }


  
  credentials: TokenPayload = {
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

//private notificationServ: NotificationService,

  constructor(private fb: FormBuilder, private accountService: AuthenticationService, private router: Router) { 
 
  }



  ngOnInit() {
  }


  register(foo: FormData) {
    this.accountService.register(foo).subscribe(() => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }

  Button1() {
    let regModel: RegModel = this.registerForm.value;
    let formData: FormData = new FormData();

    let fd = new FormData();
     
    fd.append('name', this.registerForm.value.Name);
    fd.append('surname',this.registerForm.value.Surname);
    fd.append('address',  this.registerForm.value.Address);
    fd.append('email', this.registerForm.value.Email);
    fd.append('role',this.registerForm.value.Role);
    fd.append('birthday', this.registerForm.value.Birthday);
    fd.append('password', this.registerForm.value.Password);
    fd.append('activated', "PENDING");




    // this.credentials.name = this.registerForm.value.Name;
    // this.credentials.surname = this.registerForm.value.Surname;
    // this.credentials.email = this.registerForm.value.Email;
    // this.credentials.password = this.registerForm.value.Password;
    // this.credentials.address = this.registerForm.value.Address;
    // this.credentials.birthday = this.registerForm.value.Birthday;
    // this.credentials.role = this.registerForm.value.Role;


    // regModel.Activated  = "PENDING";
   
    this.register(fd);

   
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


}

