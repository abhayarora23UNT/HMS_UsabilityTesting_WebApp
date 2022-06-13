import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
/**
 * Generated class for the NumericWithDotDirective directive.
 */
@Directive({
  selector: '[appNumericWithDot]' // Attribute selector
})
export class NumericWithDotDirective {

  @Input('appNumericWithDot') limitTo: any;

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
    const regExp = new RegExp('^[0-9.,$]+$');
    const inputChar = event.target.value;
    if (inputChar) {
      if (!regExp.test(inputChar)) {
        this.updateInputField(inputChar.slice(0, -1));
      } else if (this.limitTo === '1') {
        this.checkOneCharacterAfterDecimal(event);
      } else if (this.limitTo === '2') {
        this.checkTwoCharacterAfterDecimal(event);
      } else {
        this.checkThreeCharacterAfterDecimal(event);
      }
    }
  }

  /**
   * Function to update the input value of ng control element.
   * @param fieldValue:input value.
   */
  updateInputField(fieldValue: string) {
    const control = this.ngControl.control 
		if(control){
		 control.patchValue(fieldValue);
		}
  }

  /**
   * Function which allows only two charcters after decimal.
   * @param event:target event
   */
  checkTwoCharacterAfterDecimal(event : any) {
    const position = event.target.selectionStart;
    const numberData = (event.target.value.split('.'));

    if (numberData.length > 2) {
      this.updateInputField(event.target.value.substring(0, position - 1)
        + event.target.value.substring(position, (event.target.value.length)));
    }
    if (numberData[1] !== undefined) {
      if (numberData[1].length > 2) {
        this.updateInputField(event.target.value.substring(0, position - 1)
          + event.target.value.substring(position, (event.target.value.length)));
      }
      event.target.selectionEnd = position;
    }
  }

  /**
   * Function which allows only one character after decimal.
   * @param event:target event
   */
  checkOneCharacterAfterDecimal(event : any) {
    const position = event.target.selectionStart;
    const numberData = (event.target.value.split('.'));
    if (numberData.length > 2) {
      this.updateInputField(event.target.value.substring(0, position - 1)
        + event.target.value.substring(position, (event.target.value.length)));
    }
    if (numberData[1] !== undefined) {
      if (numberData[1].length > 1) {
        this.updateInputField(event.target.value.substring(0, position - 1)
          + event.target.value.substring(position, (event.target.value.length)));
      }
    }
    event.target.selectionEnd = position;
  }


  /**
   * Function which allows only two charcters after decimal.
   * @param event:target event
   */
  checkThreeCharacterAfterDecimal(event : any) {
    const position = event.target.selectionStart;
    const numberData = (event.target.value.split('.'));
    if (numberData.length > 3) {
      this.updateInputField(event.target.value.substring(0, position - 1)
        + event.target.value.substring(position, (event.target.value.length)));
    }
    if (numberData[1] !== undefined) {
      if (numberData[1].length > 3) {
        this.updateInputField(event.target.value.substring(0, position - 1)
          + event.target.value.substring(position, (event.target.value.length)));
      }
      event.target.selectionEnd = position;
    }
  }
}
