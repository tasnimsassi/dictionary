import { Component, OnInit } from '@angular/core';
import { Orders1Service } from '../services/orders1.service';

@Component({
  selector: 'app-orders1',
  templateUrl: './orders1.component.html',
  styleUrls: ['./orders1.component.sass']
})
export class Orders1Component implements OnInit {

  constructor(  private orderservices : Orders1Service,) { }
  Listenatend:any
  listTotal:any
  listcours:any
  listterminer:any
  valAtten
  valTerm
  valCours
  valTotal
  valprod
  valfini

  ngOnInit() {


    this.orderservices.getattente().subscribe(
 
      dataCodeof => {
       
          this.Listenatend = dataCodeof
          this.valAtten=this.Listenatend[0].num
         
      },
      err => {
          console.error(err)
     
      }
  )
    
 
  
  this.orderservices.gettotale().subscribe(
 
    dataCodeof => {
     
        this.listTotal = dataCodeof
        
        this.valTotal=this.listTotal[0].num

    },
    err => {
        console.error(err)
   
    }
)

this.orderservices.getencours().subscribe(
 
  dataCodeof => {
   
      this.listcours = dataCodeof
      this.valCours=this.listcours[0].num

    
  },
  err => {
      console.error(err)
 
  }
)

this.orderservices.gettermine().subscribe(
 
  dataCodeof => {
   
      this.listterminer = dataCodeof
      console.log(this.listterminer) 
      this.valTerm=this.listterminer[0].num

    
  },
  err => {
      console.error(err)
 
  }
)
this.orderservices.prodfini().subscribe(
 
  dataCodeof => {
   
      this.listterminer = dataCodeof
      console.log(this.listterminer) 
      this.valfini=this.listterminer[0].num

    
  },
  err => {
      console.error(err)
 
  }
)
this.orderservices.getprod().subscribe(
 
  dataCodeof => {
   
      this.listterminer = dataCodeof
      console.log(this.listterminer) 
      this.valprod=this.listterminer[0].num

    
  },
  err => {
      console.error(err)
 
  }
)

  }
  
}
