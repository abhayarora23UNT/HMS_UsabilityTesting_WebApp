import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';


/**
 * Generated class for the OnlyAlphabetsDirective directive.
 */
@Directive({
  selector: '[appOnlyAlphabets]' // Attribute selector
})
export class OnlyAlphabetsDirective {

  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event : any) {
    this.allowAlphabetCharcters(event);
  }

  /**
   * Description:Function which only allows alphabets in the input.
   * @param:event
   */
  allowAlphabetCharcters(event : any) {
    const regExp = new RegExp('^[A-Za-z ]+$');
    const inputChar = event.target.value;
    if (!regExp.test(inputChar)) {
      this.updateInputField(inputChar.slice(0, -1));
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
