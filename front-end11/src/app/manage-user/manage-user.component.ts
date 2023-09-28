import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { Toaster } from 'ngx-toast-notifications';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
 
  dataSource:any[] =[]
  filterString = "";
  filtered;
  private textsucc = 'Update  avec succès !';
  private textNosucc = 'Upadate Erroné  ! ressayer une autre fois';
  private text2 = 'utilisateur supprimé !';
  responseMessage : any ;
  constructor( private toaster: Toaster,  private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) { }

  ngOnInit() {
  
   this.onFilterChange()
  }

  tableData(){
 
  }

  onFilterChange() {
    this.ngxService.start();
    this.userService.getUsers().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource  = response
      this.filtered = this.dataSource.filter((invoice) => this.isMatch(invoice));
      console.log(this.dataSource)
      // this.dataSource = new MatTableDataSource(response);


    },(error:any)=>{
      this.ngxService.stop();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    }
    )
 
  }

  isMatch(item) {
    if (item instanceof Object) {
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  handleChangeAction(status :any , id_user:any){
    this.ngxService.start();
    var data ={
      status:status.toString(),
      id_user:id_user
    }
    this.userService.update(data).subscribe((Response:any)=>{
      this.ngxService.stop();
      this.responseMessage = Response.message ;
      this.toaster.open({
        text: this.textsucc,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
         

    },(error:any)=>{
      this.ngxService.stop();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
    })

  }
  supprimeruser(id){
    
 
    this.userService.supprimeruser(id).subscribe( reponseDuServeurrr =>{
      console.log(reponseDuServeurrr)
      this.ngOnInit()
      this.toaster.open({
        text: this.text2,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
    })

  }
}
