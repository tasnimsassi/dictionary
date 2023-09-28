import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  ForgotPasswordForm : any = FormGroup;
    responseMessage : any ;  
 
 
   constructor(private formBuilder:FormBuilder, 
     private router:Router,
     private userService : UserService,
     private SnackbarService : SnackbarService,
    //  private dialogogRef:MatDialogRef<ForgotPasswordComponent>, 
     private ngxService : NgxUiLoaderService) { }
 
  

  ngOnInit(): void {
    this.ForgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
      });
  }
  handleSubmit(){
    this.ngxService.start();
    var formData = this.ForgotPasswordForm.value ;
    var Data = {
       email : formData.email
    }
    this.userService.forgotPassword(Data).subscribe((Response:any)=>{
      this.ngxService.stop();
      // this.dialogogRef.close();
      this.responseMessage = Response.message ;
      this.SnackbarService.openSnackbar(this.responseMessage,"");
      this.router.navigate(['/']);
   },(error)=>{
    this.ngxService.stop();
    if (error.error.message){
      this.responseMessage= error.error.message;

    }
    else{
      this.responseMessage = GlobalConstants.genericError;
    }
    this.SnackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
   })
    
}}
