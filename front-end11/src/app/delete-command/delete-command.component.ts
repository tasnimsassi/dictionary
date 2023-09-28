import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { StockService } from '../services/stock.service';
import { UserService } from '../services/user.service';
import { Toaster } from 'ngx-toast-notifications';


@Component({
  selector: 'app-delete-command',
  templateUrl: './delete-command.component.html',
  styleUrls: ['./delete-command.component.sass']
})
export class DeleteCommandComponent implements OnInit {
  private text3 = 'commande supprimée!';
  private text4 = 'selectionner un code commande!';
  CODEb :string
  ListCodeOF: any[] = [];
  selectedIdCodeof:any;
  postSelectionne:string;
  registerFormsupprimer: FormGroup;
  constructor(private modalService: BsModalService, private toaster: Toaster, private formBuilder: FormBuilder,private stockservices : StockService      , private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) { }
    registerForm: FormGroup;
    submitted = false;

  ngOnInit() {
    this.GetElement();
    this.registerFormsupprimer = this.formBuilder.group({
      CODES: ['', Validators.required], 
     
     
    },  );
  }
  get f() { return this.registerForm.controls; }
  GetElement(){

    this.stockservices.getdetailscommande().subscribe(
    
      dataCodeof => {
          this.ListCodeOF = []
          this.ListCodeOF = dataCodeof;
          this.postSelectionne = ''

      },
      err => {
          console.error(err)

      }) }

      valueChangeCodeOf(newValue){
      let selectedcommande;
       selectedcommande = this.ListCodeOF.find(item => item.codeof === newValue)
      }
      supprimercommande(){

        console.log(this.registerFormsupprimer)
      const{CODES} = this.registerFormsupprimer.value;
      console.log("----------->", CODES)
      if(!CODES) {
        this.toaster.open({
          text: this.text4,
          caption: "M.E.S" + ' notification',
          type: "danger",
        });
        return 
      }
     try{
      this.stockservices.supprimercommande({CODEOF:CODES }).subscribe( reponseDuServeurrr =>{
        this.toaster.open({
          text: this.text3,
          caption: "M.E.S" + ' notification',
          type: "success",
        });
        this.ngOnInit()
        console.log(reponseDuServeurrr)
      }
      )}
      catch(erreur){
        this.toaster.open({
          text: this.text4,
          caption: "M.E.S" + ' notification',
          type: "danger",
        });
      }
      }
      onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}
