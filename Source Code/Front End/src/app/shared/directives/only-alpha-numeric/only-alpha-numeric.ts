import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Constants } from 'src/app/core/constants/constants';

/**
 * Generated class for the OnlyAlphaNumericDirective directive.
 */
@Directive({
  selector: '[appOnlyAlphaNumeric]' // Attribute selector
})
export class OnlyAlphaNumericDirective {

  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event : any) {
    this.allowAlphaNumericCharacters(event);
  }

  /**
   * Function which allows only alphanumeric characters in the input.
   * @param:event
   */
  allowAlphaNumericCharacters(event : any) {
    if (event.target.value) {
      const regExp = new RegExp(Constants.RegexPatternAlphaNumeric);
      const inputChar = event.target.value;
      if (!regExp.test(inputChar)) {
        this.updateInputField(inputChar.slice(0, -1));
      }
    }
  }

  /**
   * Function to update the input value of ng control element.
   * @param:fieldValue
   */
  updateInputField(fieldValue: string) {
    const control = this.ngControl.control 
		if(control){
		 control.patchValue(fieldValue);
		}
  }
}
