import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;


  constructor(private httpClient : HttpClient) { }

  
 
  signup(data:any){
     return this.httpClient.post(this.url+
      "/user/signup",data,{
       headers: new HttpHeaders().set('content-type',"application/json")
     })
  }
  forgotPassword(data:any){
     return this.httpClient.post(this.url+"/user/forgotPassword",data,{
      headers: new HttpHeaders().set('content-type',"application/json")
    })
  }

  login(data:any){
    return this.httpClient.post(this.url+"/user/login",data,{
     headers: new HttpHeaders().set('content-type',"application/json")
   })
 }
   checkToken(){
      return this.httpClient.get(this.url+"/user/checkToken");}


      changePassword(data:any){
        return this.httpClient.patch(this.url+"/user/changePassword",data,{
         headers: new HttpHeaders().set('content-type',"application/json")
       })
     } 
  
     getUsers(){
       return this.httpClient.get(this.url+"/user/get/");
     }

   
     update(data:any){
       return this.httpClient.patch(this.url+"/user/update/",data,{
        headers: new HttpHeaders().set('content-type',"application/json")
      })
     }
     
     supprimeruser(id): Observable<any> {
      
    return this.httpClient.delete(this.url+"/product/supprimeruser/"+ id  )
  
    }

     //page cut zone
    

     insertkeypass(data:any){
     
      return this.httpClient.post(this.url+"/product/newWorkEntry/",data,{
        headers: new HttpHeaders().set('content-type',"application/json")
      })
     }
     updateproduct(data:any){
      return this.httpClient.patch(this.url+"/product/update/",data,{
       headers: new HttpHeaders().set('content-type',"application/json")
     })
    }

    validateKeyPassAndCodeOf(keyPass:any,codeOf:any){
      let scannedQuantity = keyPass.slice(14, 17);
      console.log("-------->", scannedQuantity)
      return this.httpClient.post<string>(this.url+"/product/validate-scanned-quantity/", {codeof:codeOf, scanned_quantity:scannedQuantity});
    }
    
     
      getinfo(){
        var user_email = localStorage.getItem('user_email');
        return this.httpClient.post(this.url+"/user/getdetaille/", {email:user_email? user_email : ""});
      }
      updatequantity(data:any){
        return this.httpClient.patch(this.url+"/product/quantity",data,{
         headers: new HttpHeaders().set('content-type',"application/json")
       })
      }
      getcommandes(){
        return this.httpClient.get(this.url+"/product/getCommande/");;
      }
      insertremarque(data:any){
        return this.httpClient.put(this.url+"/product/remarques",data,{
         headers: new HttpHeaders().set('content-type',"application/json")
       })
      }

      getremarques(){
        return this.httpClient.get(this.url+"/product/getremarque/");;
      } 


      supprimerremarque(id): Observable<any> {
      
        return this.httpClient.delete(this.url+"/product/supprimerremarque/"+ id  )
      
        }

      insertcommande(data:any){
        return this.httpClient.post(this.url+"/product/inserercommandes",data,{
         headers: new HttpHeaders().set('content-type',"application/json")
       })
      } 
}
