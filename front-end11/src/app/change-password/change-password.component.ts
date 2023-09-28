import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
   changePasswordForm :any = FormGroup;
   responseMessage : any ;

  private textsuc="password updated successfully"
  constructor(private formBuilder : FormBuilder,
    private userService : UserService,
    private router: Router,
    private toaster: Toaster,
    // public dialogRef : MatDialogRef<ChangePasswordComponent>,
    private ngxService : NgxUiLoaderService ,
    private SnackbarService : SnackbarService) { }
    
  ngOnInit(): void {
    this.changePasswordForm= this.formBuilder.group({
      oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
  }
  
  validateSubmit(){

  if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
    return true ;
  }
  else {
    return false ;
  }
}
handleChangePasswordSubmit(){
  //this.ngxService.start();
  console.log("a")

  var formData = this.changePasswordForm.value;
  var data = {
    oldPassword : formData.oldPassword,
    newPassword : formData.newPassword,
    confirmPassword : formData.confirmPassword
  }
  this.userService.changePassword(data).subscribe((Response:any)=>{
  
    console.log("b")
   
    this.toaster.open({
      text: Response.message,
      caption: "M.E.S" + ' notification',
      type: "success",
    });
    this.responseMessage = Response.message ;
    this.router.navigate(['/login']);

     
 },(error)=>{
  
  // console.log(error);
  
  if (error.error.message){
    console.log("c")
    this.responseMessage= error.error.message;
    this.toaster.open({
      text: this.responseMessage,
      caption: "error" + ' notification',
      type: "danger",
    });

  }
  else{
    // this.responseMessage = GlobalConstants.genericError;
    console.log("d")

    this.toaster.open({
      text: this.responseMessage,
      caption: "error" + ' notification',
      type: "warning",
    });
  }
  // this.SnackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
 }
 )
}
}
