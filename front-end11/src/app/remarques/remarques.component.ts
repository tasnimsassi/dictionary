import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-remarques',
  templateUrl: './remarques.component.html',
  styleUrls: ['./remarques.component.sass']
})
export class RemarquesComponent implements OnInit {
  dataSource:any[] =[]
  filterString = "";
  filtered;


  private text2 = 'remarque supprimé !';
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
    this.userService.getremarques().subscribe((response:any)=>{
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
  supprimerremarque(id){
    
 
    this.userService.supprimerremarque(id).subscribe( reponseDuServeurrr =>{
      console.log(reponseDuServeurrr)
      this.ngOnInit()
      this.toaster.open({
        text: this.text2,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
    
 },   err => {
  console.log("messages",err.message)
  this.toaster.open({
      text: err.error.message,
      caption: "Unauthorized",
      type: "danger",
    });
  console.error(err)
}
 )

  }
}
