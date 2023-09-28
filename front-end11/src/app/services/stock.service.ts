import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }



  createemplacement(data): Observable<any> {   
    return this.http.post(this.url+'/product/insereremplacement', data,{headers: new HttpHeaders().set('content-type',"application/json")});
    
  }

  
  createSite(data): Observable<any> {   
    return this.http.post(this.url+'/product/inserersite', data,{headers: new HttpHeaders().set('content-type',"application/json")});
    
  }

  create(data): Observable<any> {   
    return this.http.post(this.url+'/product/insererProduit', data,{headers: new HttpHeaders().set('content-type',"application/json")});
    
  }

  createTransfert(data): Observable<any> {   
    return this.http.post(this.url+'/product/ordretransfert', data,{headers: new HttpHeaders().set('content-type',"application/json")});
    
  }
ajoutercommande(data): Observable<any> {   
  console.log("1 time")
  return this.http.post(this.url+'/product/inserercommande', data,{headers: new HttpHeaders().set('content-type',"application/json")});
  
}

  getProduit(): Observable<any> {
    return this.http.get(this.url+"/product/getproduit");
  }
  getSite(): Observable<any> {
    return this.http.get(this.url+"/product/getSite");
  }
  upateProduit(data): Observable<any> {
    return this.http.patch(this.url+'/product/updateproduit', data,{headers: new HttpHeaders().set('content-type',"application/json")});

    
  }
  updatequantity(data): Observable<any> {
    return this.http.put(this.url+'/product/updatequantity', data,{headers: new HttpHeaders().set('content-type',"application/json")});

    
  }



 

  getProductById(id): Observable<any> {
    return this.http.get(this.url+"/product/afficherproduit/"+id);
  }

  getEmp(): Observable<any> {
    return this.http.get(this.url+"/product/getEmplacement");
  }

  getCodeof(): Observable<any> {
    return this.http.get(this.url+"/product/getcodeof");
  }

  upatecommande(data): Observable<any> {
    return this.http.patch(this.url+'/product/updatecommandes', data,{headers: new HttpHeaders().set('content-type',"application/json")});

    
  }
  getdetailscommande(): Observable<any> {
    return this.http.get(this.url+"/product/getdetailscommande");
  }
  supprimercommande(CODEOF: {CODEOF: any} ): Observable<any> {
    console.log("sssssss",CODEOF )
  return this.http.delete(this.url+"/product/supprimercommandes/"+ CODEOF['CODEOF'] )

  }

  supprimerproduit(id): Observable<any> {
   
  return this.http.delete(this.url+"/product/supprimerproduit/"+ id  )

  }

  afficherTransfert(id): Observable<any> {
   
    return this.http.get(this.url+"/product/affichertransfert/"+ id  )
  
    }
}
