import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { Toaster } from 'ngx-toast-notifications';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm : any = FormGroup;
   responseMessage : any ; 
  private textsucc = "successfully registered! "
  textNosucc="email already exist ."
  constructor(private formBuilder:FormBuilder, 
    private router : Router,
    private userService : UserService,
    private SnackbarService : SnackbarService,
    private toaster: Toaster,
    private ngxService : NgxUiLoaderService,) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]],
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value ;
    var Data = {
       name : formData.name,
       email : formData.email,
       contactNumber : formData.contactNumber,
       password : formData.password 

    }
    this.userService.signup(Data).subscribe((Response:any)=>{
       this.ngxService.stop();
       this.toaster.open({
        text: this.textsucc,
        caption: "Erreur" + ' notification',
        type: "success",
      });
  
       this.router.navigate(['/home']);
    },(error)=>{
      this.toaster.open({
        text: this.textNosucc,
        caption: "Erreur" + ' notification',
        type: "danger",
      });
     this.ngxService.stop();
    //  if (error.error?.message){
    //    this.responseMessage= error.error?.message;

    //  }
    //  else{
    //    this.responseMessage = GlobalConstants.genericError;
    //  }
    // this.SnackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    }
    )
  }


}
