import { ɵConsole } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function MustExist(currentUserName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
  
        const matchingControl = formGroup.controls[matchingControlName];


        // set error on matchingControl if validation fails
        if (currentUserName !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}