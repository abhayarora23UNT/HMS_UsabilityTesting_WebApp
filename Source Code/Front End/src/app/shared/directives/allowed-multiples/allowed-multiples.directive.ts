import { ValidatorFn, AbstractControl } from '@angular/forms';



export function allowedMultiples(val: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const rem = control.value % val;
        if (rem !== 0) {
            return { multipleNotAllowed: true , multipleVal: val};
        }
        return null;
    };
}
