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
  selector: 'app-update-command',
  templateUrl: './update-command.component.html',
  styleUrls: ['./update-command.component.sass']
})
export class UpdateCommandComponent implements OnInit {
  ListCodeOF: any[] = [];
  selectedIdCodeof:any;
  registerFormUpdate: FormGroup;
  quantitya:string;
  poste_travaillea:string;
  CODEa:string;

  /*********/

  recenctCode:string;
  /********/
  private textsucc = 'Update  avec succès !';
  private textNosucc = 'Upadate Erroné  ! ressayer une autre fois';
  constructor(private modalService: BsModalService, private toaster: Toaster, private formBuilder: FormBuilder,private stockservices : StockService      , private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) { }
    registerForm: FormGroup;
    submitted = false;
    postSelectionne:string;
  ngOnInit() {
    this.GetElement();
    this.registerFormUpdate = this.formBuilder.group({
      CODE: ['', Validators.required], 
      quantity: ['', Validators.required],
      poste_travaille: ['', Validators.required],
     
  },  );
  this.registerFormUpdate.get("CODE").valueChanges.subscribe(newValue =>{ 
    this.recenctCode = newValue;
    this.valueChangeCodeOf(newValue)})
  }
  get f() { return this.registerForm.controls; }
 
  GetElement(){

  this.stockservices.getdetailscommande().subscribe(
  
    dataCodeof => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!>", dataCodeof)
     
        this.ListCodeOF = []
        this.ListCodeOF = dataCodeof;
        this.postSelectionne = ''
    },
    err => {
        console.error(err)
   
    })}

    valueChangeCodeOf(newValue){
    let selectedcommande;
     selectedcommande = this.ListCodeOF.find(item => item.codeof === newValue)
     console.log("pppppp", newValue)
      if(selectedcommande) {
        this.postSelectionne = selectedcommande.poste;
         this.quantitya = selectedcommande.qte_of;
    } }
    
    Updatecommande(){
    
      console.log(this.registerFormUpdate)
      console.log("---->CODE", this.recenctCode)
    const{CODE,poste_travaille,quantity} = this.registerFormUpdate.value;
    if(!CODE || !poste_travaille || !quantity){
      this.toaster.open({
        text: this.textNosucc,
        caption: "M.E.S" + ' notification',
        type: "danger",
      });
      return
    }
    this.stockservices.upatecommande({CODEOF:this.recenctCode , QTE_OF:quantity , poste:poste_travaille}).subscribe( reponseDuServeurrr =>{
    
      console.log("serverure response  ",reponseDuServeurrr)
    this.registerFormUpdate.get('CODE').reset()
      this.GetElement();
      this.toaster.open({
        text: this.textsucc,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
      this.ngOnInit()
      this.submitted = false;
      this.registerFormUpdate.reset();
    
    }) }
    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
