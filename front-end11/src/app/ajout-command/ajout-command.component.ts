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
  selector: 'app-ajout-command',
  templateUrl: './ajout-command.component.html',
  styleUrls: ['./ajout-command.component.sass']
})
export class AjoutCommandComponent implements OnInit {
  private text1 = 'commande ajoutée avec succès!';
  private text2 = 'une erreur est survenue  ! ressayer une autre fois';
 private text4='poste must be equal to 4 characters'
  constructor(private modalService: BsModalService, private toaster: Toaster, private formBuilder: FormBuilder,private stockservices : StockService      , private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) { }
    registerForm: FormGroup;
    submitted = false;

    stocktext: any;
    UAtext: any;
    DescriptionText; 
    UVtext: any;
    grptext: any;
    QTE_OF:any;
    OF_PARENT:any;
    ListCodeOF: any[] = [];
    selectedIdCodeof:any;
  postSelectionne:string;
 
  ngOnInit() {
    this.GetElement();
    this.registerForm = this.formBuilder.group({
      CODE_PROJET: ['', Validators.required], 
      QTE_OF: ['', Validators.required],
      OF_PARENT: ['', Validators.required],//
      DATEDEBUTOF: ['', Validators.required,],//
      DATEFINOF: ['', Validators.required, ],//
      poste: ['', Validators.required],
     
  },  );
  
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
   
    }
)
  }

  onSubmitcommande() {
    
    let arrayConv =[]
       this.submitted = true;
    
      console.log(this.registerForm.value)
      if( this.registerForm.value.poste.length !== 4 ) {
        this.toaster.open({
          text: this.text4,
          caption: "M.E.S" + ' notification',
          type: "danger",
        });

        return;
      }
       this.stockservices.ajoutercommande( JSON.stringify(this.registerForm.value, null, 4)).subscribe(
 
         (
         )=>{
 
          this.toaster.open({
            text: this.text1,
            caption: "M.E.S" + ' notification',
            type: "success",
          });
           this.ngOnInit()
           this.submitted = false;
  
    
           this.registerForm.reset();
 
         })
       
       // display form values on success
       console.log("check", JSON.stringify(this.registerForm.value, null, 4))
 
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
   }
   onReset() {
    this.submitted = false;
  
    
    this.registerForm.reset();
   
   
}
valueChangeCodeOf(newValue){
let selectedcommande;
 selectedcommande = this.ListCodeOF.find(item => item.codeof === newValue)

}

}
