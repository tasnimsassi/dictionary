import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials= {
 
    email: '',
    password: '',


}
loginForm : any = FormGroup;
responseMessage : any ;  
private textNosucc = 'Erreur Login ou mot de passe ! Réessayer';

  constructor(private toaster: Toaster,private formBuilder:FormBuilder, 
    private router:Router,
    private userService : UserService,
    private SnackbarService : SnackbarService,
 
    private ngxService : NgxUiLoaderService,
    ) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({

    //   email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
    //   password:[null,[Validators.required]],
    // })
  }
  handleSubmit(){
    // this.ngxService.start();
    // var formData = this.loginForm.value ;
    // var Data = {
       
    //    email : formData.email,
    //    password : formData.password 

       
    // }
    this.userService.login(this.credentials).subscribe((Response:any)=>{
      console.log(Response)
      
      
       localStorage.setItem('token',Response.token);
       localStorage.setItem('user_email', this.credentials.email);
       localStorage.setItem('user_id', Response.user_id)
       localStorage.setItem('role', Response.role)

       this.router.navigate(['/report']);
    },   err => {
      console.log("messages",err.message)
      this.toaster.open({
          text: err.error.message,
          caption: "Erreur" + ' notification',
          type: "danger",
        });
      console.error(err)
  }

    )
  
  }

 
}
