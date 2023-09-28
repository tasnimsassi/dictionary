import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { StockService } from '../services/stock.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  chakcdatatransfert 
 codeofdataTransdert
 statutdataTransfert
 datedataTransfert
 statutTransfert
 dateTransfert

 quantitecheck
 dataSource
 filterString = "";
  filtered;
  selectedIdSiteTransfert
  selectidempalcemntTransfert
  modalRef: any;
  stocktext: any;
  UAtext: any;
  Qte_Transfertdata
  UVtext: any;
  grptext: any;
  textsiteadd
  textemplecementadd
  private text1 = 'produit ajoutée avec succès!';
  private text2 = 'produitsupprimé !';
  private text3 = 'update avec succées  !';
  private text4 = 'quantité transferée avec succées  !';
  private text5 = 'quantité impossible !';
  private text6 = 'site ajouté avec succées !';
  private text7 = 'emplacement ajouté avec succées !';
  private text9 = 'produit en fin de stock !';


  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,private stockservices : StockService      ,private toaster: Toaster, private ngxService : NgxUiLoaderService,
    private userService : UserService,
    private snackbarService : SnackbarService) {   this.registerForm = this.formBuilder.group({
      CODEOF: [null, Validators.required], 
      qte_dispo: [null, Validators.required],
      DESCRIPTION: [null, Validators.required],//
      UNITE_ACHAT: [null, Validators.required,],//
      UNITE_VENTE: [null, Validators.required, ],//
      id_emplacement: [null, Validators.required],
      GRP_ARTICLE: [null, Validators.required],  //
      id_site: [null, Validators.required]
  },  );

 this.registerFormUpdate = this.formBuilder.group({
    CODEOF: ['', Validators.required], 
    qte_dispo: ['', Validators.required],
    DESCRIPTION: ['', Validators.required],//
    UNITE_ACHAT: ['', Validators.required,],//
    UNITE_VENTE: ['', Validators.required, ],//
    id_emplacement: ['', Validators.required],
    GRP_ARTICLE: ['', Validators.required],  //
    id_site: ['', Validators.required]
},  );

this.registerFormTransfert = this.formBuilder.group({
  CODE_ARTICLE: ['' ], 
  Qte_Transfert: ['', Validators.required],
 
  id_emplacement: ['' ],
   //
  id_site: ['' ],
  To_id_site: ['', Validators.required],
  To_id_emplacement: ['', Validators.required],
  date_transfert: ['', Validators.required],
  status_transfert: ['', Validators.required],

},  );

}
  registerForm: FormGroup;
  ListProduct :[]
  ListTransfert:[]
  ListCodeOF: any[] = [];
  ListEmp: any[] = [];
  codeArticle
  DescriptionText;
  ListSite: any[] = [];
  registerFormTransfert: FormGroup;
  registerFormUpdate; FormGroup;
  submitted = false;
  submittedUpdate = false;
  submittedTransfert=false;
  selectedIdSite:any
  selectedIdCodeof:any
  selectedIdEmp:any


 
  ngOnInit() {
   
   
 


 

this.onFilterChange()

  }

  get f() { return this.registerForm.controls}
  get ft() { return   this.registerFormTransfert.controls}
  UpdateProduit(){}
  Transfert (){
    this.submittedTransfert = true;

  // stop here if form is invalid
  if (this.registerFormTransfert.invalid) {
      return;
  }

  if(Number(this.quantitecheck)===0){
    this.toaster.open({
      text: this.text9,
      caption: "M.E.S" + ' notification',
      type: "danger",
    });

   }
    else if(Number(this.quantitecheck)<Number(this.registerFormTransfert.value.Qte_Transfert)){
      this.toaster.open({
        text: this.text5,
        caption: "M.E.S" + ' notification',
        type: "danger",
      });
    }
   
     
    else{
      var dataquantitenew
      dataquantitenew= Number(this.quantitecheck)-Number(this.registerFormTransfert.value.Qte_Transfert)
     var  dataupdateTransfert={"qte_dispo":dataquantitenew,"CODE_ARTICLE":this.codeArticle}
      this.stockservices.updatequantity(dataupdateTransfert).subscribe(

        (
        )=>{
    console.log("dataupdateTransfert",dataupdateTransfert)
       
          this.registerFormTransfert.value.CODE_ARTICLE = this.codeArticle
          
           this.registerFormTransfert.value.CODEOF  =this.codeofdataTransdert
           this.registerFormTransfert.value.statut_transfert  =this.statutTransfert 
           this.registerFormTransfert.value.date_transfert  =this.dateTransfert
           this.stockservices.createTransfert( JSON.stringify(this.registerFormTransfert.value, null, 4)).subscribe(
         
             (
             )=>{
         
              
            
      
          
         
             })
             this.ngOnInit()
             this.modalRef.hide()
             this.submittedTransfert=false

             this.registerFormTransfert.reset()
             this.submitted=false
             this.registerForm.reset()
             this.toaster.open({
              text: this.text4,
              caption: "M.E.S" + ' notification',
              type: "success",
            });
       
        })
    
    }
    
     
    console.log("new quantie ", JSON.stringify(this.registerFormTransfert.value, null, 4))
  
  }
  GetElement(){

    this.stockservices.getCodeof().subscribe(
 
      dataCodeof => {
       
          this.ListCodeOF = dataCodeof
          console.log(this.ListSite) 
        
      },
      err => {
          console.error(err)
     
      }
  )
  this.stockservices.getEmp().subscribe(
   
    dataEmps => {
     
        this.ListEmp = dataEmps
       
      
    },
    err => {
        console.error(err)
   
    }
)
    this.stockservices.getSite().subscribe(
   
      dataList => {
       
          this.ListSite = dataList
          console.log(this.ListSite) 
        
      },
      err => {
          console.error(err)
     
      }
  )


}
UpdateProduits11(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  // this.ListProduct=JSON.stringify(this.registerForm.value,null,4)
  // arrayConv.push(this.registerForm.value)
 console.log("this.selectedIdEmp",this.selectedIdEmp)
 console.log("this.selectedIdCodeof",this.selectedIdCodeof)
 this.registerForm.value.CODE_ARTICLE = this.codeArticle
  this.registerForm.value.id_site = this.selectedIdSite
  this.registerForm.value.id_emplacement = this.selectedIdEmp
  this.registerForm.value.CODEOF = this.selectedIdCodeof
  this.stockservices.upateProduit( JSON.stringify(this.registerForm.value, null, 4)).subscribe(

    (
    )=>{
     
      this.modalRef.hide()
      this.ngOnInit()
      this.toaster.open({
        text: this.text3,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
 

    })
  
  // display form values on success
  console.log("check", JSON.stringify(this.registerForm.value, null, 4))
 
}
  onSubmitProduit() {
   let arrayConv =[]
      this.submitted = true;

      // stop here if form is invalid
     
      // this.ListProduct=JSON.stringify(this.registerForm.value,null,4)
      // arrayConv.push(this.registerForm.value)
     console.log("this.selectedIdEmp",this.selectedIdEmp)
     console.log("this.selectedIdCodeof",this.selectedIdCodeof)
      this.registerForm.value.id_site = this.selectedIdSite
      this.registerForm.value.id_emplacement = this.selectedIdEmp
      this.registerForm.value.CODEOF = this.selectedIdCodeof
      this.stockservices.create( JSON.stringify(this.registerForm.value, null, 4)).subscribe(

        (
        )=>{
          this.toaster.open({
            text: this.text1,
            caption: "M.E.S" + ' notification',
            type: "success",
          });
          this.modalRef.hide()
          this.ngOnInit()

        })
      
      // display form values on success
      console.log("check", JSON.stringify(this.registerForm.value, null, 4))
      
      this.registerForm.reset()
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.submittedUpdate = false;
      this.submittedTransfert = false;
      
      this.registerForm.reset();
      this.registerFormTransfert.reset();
      this.registerFormUpdate.reset();
      this.modalRef.hide()
  }
  openModal(template: TemplateRef<any>) {

 
 
   
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
    });
    this.submitted = false;
   
   this.GetElement()
  }
 
  valueChange(event){
    // this.selectedIdSite = event.target.value ;
    // console.log( "eee",this.selectedIdSite);
  
  }
  valueChangeEmp(event){
    // this.selectedIdSite = event.target.value ;
    // console.log( "eee",this.selectedIdSite);
  
  }
  valueChangeCodeOf(event){
    // this.selectedIdSite = event.target.value ;
    // console.log( "eee",this.selectedIdSite);
  
  }
  selected(arg0: string, value: any, arg2: string, selected: any) {
    throw new Error('Method not implemented.');
  }
  openModal2(template2: TemplateRef<any>,id) { // m
 
    this.stockservices.getProductById(id).subscribe(
   
      dataProduit => {
        dataProduit.forEach(element => {
          
         this.DescriptionText= element.DESCRIPTION
         this.stocktext =element.qte_dispo
         this.UAtext=element.UNITE_ACHAT
         this.UVtext=element.UNITE_VENTE
         this.grptext=element.GRP_ARTICLE
       //  this.stocktext =element.qte_dispo
          this.codeArticle=element.CODE_ARTICLE
       
        });
     
         console.log("editdata",dataProduit)
        
      },
      err => {
          console.error(err)
     
      }
  )
    this.modalRef = this.modalService.show(template2, {
      animated: true,
      backdrop: 'static'
    });
    this.GetElement()
  }
  openModal3(template3: TemplateRef<any>,id) {

 
    this.stockservices.getProductById(id).subscribe(
   
      dataProduit => {
        dataProduit.forEach(element => {
         this.selectedIdSite= element.nom_site  
         this.DescriptionText= element.DESCRIPTION
         this.stocktext =element.qte_dispo
         this.UAtext=element.UNITE_ACHAT
         this.UVtext=element.UNITE_VENTE
         this.grptext=element.GRP_ARTICLE
         this.selectedIdSiteTransfert=element.nom_site
         this.selectidempalcemntTransfert=element.nom_emplacement
       //  this.stocktext =element.qte_dispo
          this.codeArticle=element.CODE_ARTICLE
          this.quantitecheck=element.qte_dispo
          this.codeofdataTransdert=element.CODEOF
        });
     
         console.log("editdata",dataProduit)

         
        
      },
      err => {
          console.error(err)
     
      }
  )
   
    this.modalRef = this.modalService.show(template3, {
      animated: true,
      backdrop: 'static'
    });
 
    this.submitted = false;
    this.GetElement()
 
  }

  affTransfert(id){

  }
  supprimerproduit(id){
    
 
    this.stockservices.supprimerproduit(id).subscribe( reponseDuServeurrr =>{
      console.log(reponseDuServeurrr)
      this.ngOnInit()
      this.toaster.open({
        text: this.text2,
        caption: "M.E.S" + ' notification',
        type: "success",
      });
    })

  }

  onFilterChange() {
    this.ngxService.start();
    this.stockservices.getProduit().subscribe((response:any)=>{
      this.ngxService.stop();
      this.ListProduct  = response
      this.filtered = this.ListProduct.filter((invoice) => this.isMatch(invoice));
      console.log(this.ListProduct)
      // this.dataSource = new MatTableDataSource(response);
    

    },(error:any)=>{
      this.ngxService.stop();
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
  clearInputMethod2() { 
    this.registerForm.setValue({CODEOF: '', qte_dispo: '',DESCRIPTION: '', UNITE_ACHAT: '',UNITE_VENTE: '', id_emplacement: ''
  
  ,GRP_ARTICLE: '', id_site: ''
  }); }


    openModal4(template4: TemplateRef<any>,id) {

 
 console.log(id)
   
    this.modalRef = this.modalService.show(template4, {
      animated: true,
      backdrop: 'static',
    });
 
   
    this.ngxService.start();
    this.stockservices.afficherTransfert(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.ListTransfert  = response
      if(this.ListTransfert.length!=0){
        this.chakcdatatransfert="1"
      }else{
        this.chakcdatatransfert="0"
      }
      console.log(this.ListTransfert)
        
      // this.dataSource = new MatTableDataSource(response);
    

    },(error:any)=>{
      this.ngxService.stop();
     }
    )
  }

  addsite(){

    
  var ObjectsIte= {
      "nom_site":this.textsiteadd
  }
    this.stockservices.createSite( ObjectsIte).subscribe(

      (
      )=>{
        this.toaster.open({
          text: this.text6,
          caption: "M.E.S" + ' notification',
          type: "success",
        });
        this.modalRef.hide()
        this.ngOnInit()

      })
  }

  addemplacement(){

    
    var Objects= {
        "nom_emplacement":this.textemplecementadd
    }
      this.stockservices.createemplacement( Objects).subscribe(
  
        (
        )=>{
          this.toaster.open({
            text: this.text7,
            caption: "M.E.S" + ' notification',
            type: "success",
          });
          this.modalRef.hide()
          this.ngOnInit()
  
        })
    }

}
