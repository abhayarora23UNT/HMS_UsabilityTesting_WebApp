import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
/**
 * Generated class for the NumericWithCommaDirective directive.
 */
@Directive({
  selector: '[appNumericWithComma]' // Attribute selector
})
export class NumericWithCommaDirective {

  @Input('limitTo') limitTo: any;

  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event : any) {
    this.allowNumericCharacters(event);
  }

  /**
   * Function which only allows numeric characters in the input.
   * @param event:target event
   */
  allowNumericCharacters(event : any) {
    const regExp = new RegExp('^[0-9.,]+$');
    const inputChar = event.target.value;
    if (inputChar) {
      if (!regExp.test(inputChar)) {
        this.updateInputField(inputChar.slice(0, -1));
      }

    }
  }

  /**
   * Function to update the input value of ng control element.
   * @param fieldValue:input value
   */
  updateInputField(fieldValue: string) {
    const control = this.ngControl.control 
		if(control){
		 control.patchValue(fieldValue);
		}
  }



}
