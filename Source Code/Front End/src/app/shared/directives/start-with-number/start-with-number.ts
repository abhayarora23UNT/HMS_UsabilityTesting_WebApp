import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appStartWithNumbersOnly]'
})
export class StartWithNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    //   debugger;
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/^[-!#@$%^&*()_+|~=`{}\[\]:";'<>?,.\|a-zA-Z]/, '');

    this.el.nativeElement.value = initalValue.test();
    if ( initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
