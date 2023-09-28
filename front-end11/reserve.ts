import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { StockService } from '../services/stock.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ordres',
  templateUrl: './ordres.component.html',
  styleUrls: ['./ordres.component.sass']
})
export class OrdresComponent implements OnInit {
  modalRef: any;
  stocktext: any;
  UAtext: any;
  DescriptionText; //mch 3adiii
  UVtext: any;
  grptext: any;
  QTE_OF:any;
  OF_PARENT:any;
  ListCodeOF: any[] = [];
  selectedIdCodeof:any;
  registerFormUpdate: FormGroup;
  registerFormsupprimer: FormGroup;


  quantitya:string;
  poste_travaillea:string;
  CODEa:string;
  CODEb :string //teba3 supprimer

  postSelectionne:string;
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,private stockservices : StockService      , private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) { }
    registerForm: FormGroup;
    submitted = false;
 
  

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
  this.registerFormUpdate = this.formBuilder.group({
    CODE: ['', Validators.required], 
    quantity: ['', Validators.required],
    poste_travaille: ['', Validators.required],
   
},  );


this.registerFormsupprimer = this.formBuilder.group({
  CODES: ['', Validators.required], 
 
 
},  );


this.registerFormUpdate.get("CODE").valueChanges.subscribe(newValue => this.valueChangeCodeOf(newValue))

  }
  
  get f() { return this.registerForm.controls; }
 
  GetElement(){

  this.stockservices.getdetailscommande().subscribe(
  
    dataCodeof => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!>", dataCodeof)
     
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
       if (this.registerForm.invalid) {
           return;
       }
      
      
       this.stockservices.ajoutercommande( JSON.stringify(this.registerForm.value, null, 4)).subscribe(
 
         (
         )=>{
 this.registerForm.reset()
          //  this.modalRef.hide()
          //  this.ngOnInit()
 
         })
       
       // display form values on success
       console.log("check", JSON.stringify(this.registerForm.value, null, 4))
 
       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
   }
   onReset() {
    this.submitted = false;
  
    
    this.registerForm.reset();
   
    this.modalRef.hide()
}


valueChangeCodeOf(newValue){



  // console.log("ssssssssssssssss",event.target)
  // console.log("selected valuevvvvvvv",event.target.value);
  //  let etv = event.target.value[0] - 1;
let selectedcommande;
 selectedcommande = this.ListCodeOF.find(item => item.codeof === newValue)
 console.log("pppppp", newValue)
  // let selectedcommande = this.ListCodeOF[newValue]
  //  console.log("new lisrcodeof--->", this.ListCodeOF)
  // console.log("selected item", selectedcommande)
  if(selectedcommande) {
    this.postSelectionne = selectedcommande.poste;


    // console.log("quantity, ", this.quantitya)
     this.quantitya = selectedcommande.qte_of;

   }

}



Updatecommande(){

  console.log(this.registerFormUpdate)
const{CODE,poste_travaille,quantity} = this.registerFormUpdate.value;

this.stockservices.upatecommande({CODEOF:CODE , QTE_OF:quantity , poste:poste_travaille}).subscribe( reponseDuServeurrr =>{

  console.log(reponseDuServeurrr)
this.registerFormUpdate.get('CODE').reset()
  this.GetElement();
  this.registerFormUpdate.reset();
  this.registerFormUpdate.get('CODE').reset()

})
}

supprimercommande(){

  console.log(this.registerFormsupprimer)
const{CODES} = this.registerFormsupprimer.value;
console.log("----------->", CODES)
this.stockservices.supprimercommande({CODEOF:CODES }).subscribe( reponseDuServeurrr =>{
  console.log(reponseDuServeurrr)
})
}
}
