import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";





export function keyPassValidator(){

    return (control:AbstractControl) => {


        const value = control.value

        if(!value)return null

    }
}