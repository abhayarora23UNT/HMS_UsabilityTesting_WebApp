import { Directive, HostListener, Self, ElementRef, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Constants } from 'src/app/core/constants/constants';


/**
 * Generated class for the OnlyNumericDirective directive.
 */
@Directive({
  selector: '[appValidationBg]' // Attribute selector
})
export class ValidationBackgroundDirective {

    constructor(@Self() private ngControl: NgControl, private el: ElementRef) {

    }

    @HostBinding('class.fieldValidator')
    get showBorder() {
        const fgControl = this.ngControl.control;
        const requiredValidator = 'required';
        if (fgControl != null && fgControl.validator != null) {
            let element = (fgControl as any).nativeElement;
            element = this.el.nativeElement.parentNode;
            if (fgControl.status !== Constants.FormDisabled && fgControl.validator.name === requiredValidator) {
                if (!element.classList.contains(requiredValidator)) {
                    element.classList.add(requiredValidator);
                }
            } else {
                element.classList.remove(requiredValidator);
            }
        } else {
            const element = this.el.nativeElement.parentNode;
            element.classList.remove(requiredValidator);
        }

        return true;
    }

}
