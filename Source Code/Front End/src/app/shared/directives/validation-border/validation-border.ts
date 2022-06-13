import { Directive, Self, HostBinding, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Generated class for the ValidationBorderDirective directive.
 *
 */
@Directive({
  selector: '[appValidationBorder]', // Attribute selector
  exportAs: 'validationBorder'
})
export class ValidationBorderDirective {

  static isSubmitted: boolean;

  colors: any = {
    VALID: '#00000033',
    INVALID: 'red',
  };

  constructor(@Self() private ngControl: NgControl, private el: ElementRef) {
  }

  @HostBinding('class.form-control')
  get showBorder() {
    let element = (this.ngControl.control as any).nativeElement;
    element = this.el.nativeElement;
    if (element != null) {
        const status=this.ngControl.status;
        if(status){
          const borderStyle = '1px solid ' + this.colors[status];
          element.style.setProperty('border', this.elementState ? borderStyle : null, 'important');
        }
    }
    return true;
  }

  /**
   * Desc: Function to return submitted state
   */
  get elementState() {
    return this.ngControl.invalid && ValidationBorderDirective.isSubmitted;
  }

  /**
   * Desc: Function to update value for isSubmitted variable
   */
  isSubmit(val:any) {
    ValidationBorderDirective.isSubmitted = val;
  }
}
