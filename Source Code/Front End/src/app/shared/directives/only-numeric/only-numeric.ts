import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';


/**
 * Generated class for the OnlyNumericDirective directive.
 */
@Directive({
  selector: '[appOnlyNumeric]' // Attribute selector
})
export class OnlyNumericDirective {

  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event:any) {
    this.allowNumericCharacters(event);
  }

  /**
   * Function which only allow numeric characters.
   * @param:event
   */
  allowNumericCharacters(event:any) {
    if (event.target.value) {
      const regExp = new RegExp('^[0-9]+$');
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
    const control=this.ngControl.control;
    if(control){
      control.patchValue(fieldValue);
    }
  }

}
