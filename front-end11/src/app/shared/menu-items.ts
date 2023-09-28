import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    icon:string;
    role:string;
}

const MENUITEMS =[ 
    {state : 'dashboard',name : 'dashboad' , icon:'dashboard', role:''},
    {state : 'user',name : 'view User' , icon:'people', role:'admin'},
   {state : 'coupe',name : 'cut zone' , icon:'camera', role:''}
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[]{
        return MENUITEMS ;
    }
}