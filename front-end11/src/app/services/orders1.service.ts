import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Orders1Service {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }


  gettotale(): Observable<any> {
    return this.http.get(this.url+"/dashboard/totalcommand");
  }

  getattente(): Observable<any> {
    return this.http.get(this.url+"/dashboard/commandattente");
  }

  getencours(): Observable<any> {
    return this.http.get(this.url+"/dashboard/commandcours");
  }

  gettermine(): Observable<any> {
    return this.http.get(this.url+"/dashboard/commandfini");
  }
  getprod(): Observable<any> {
    return this.http.get(this.url+"/dashboard/totalprod");
  }

  prodfini(): Observable<any> {
    return this.http.get(this.url+"/dashboard/prodfini");
  }

/// pour reports

statecommande(): Observable<any> {
  return this.http.get(this.url+"/dashboard/statecommande");
}


tempstravaille(): Observable<any> {
  return this.http.get(this.url+"/dashboard/tempstravaille");
}
 
}
