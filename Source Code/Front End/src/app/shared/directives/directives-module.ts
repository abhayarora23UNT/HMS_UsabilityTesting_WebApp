import { NgModule } from '@angular/core';


import { OnlyAlphabetsDirective } from './only-alphabets/only-alphabets';
import { LimitToDirective } from './limit-to/limit-to';
import { OnlyAlphaNumericDirective } from './only-alpha-numeric/only-alpha-numeric';
import { OnlyNumericDirective } from './only-numeric/only-numeric';
import { AllowSpecialCharactersDirective } from './allow-special-characters/allow-special-characters';
import { NumericWithDecimalDirective } from './numeric-with-decimal/numeric-with-decimal';
import { NumericWithDotDirective } from './numeric-with-dot/numeric-with-dot';
import { NumericWithCommaDirective } from './numeric-wtih-comma/numeric-with-comma';
import { FormatDecimalDirective } from './format-decimal/format-decimal.directive';
import { ValidationBackgroundDirective } from './validation-background/validation-background';
import { TwoDigitDecimaNumberDirective } from './only-number-with-decimal/only-number-with-decimal';
import { StartWithNumberDirective } from './start-with-number/start-with-number';
import { NumericWithExponentialDirective } from './numeric-with-exponential/numeric-with-exponential';
import { ValidationBorderDirective } from './validation-border/validation-border';



@NgModule({
    declarations: [
        LimitToDirective,
        OnlyAlphabetsDirective,
        OnlyAlphaNumericDirective,
        OnlyNumericDirective,
        AllowSpecialCharactersDirective,
        NumericWithDecimalDirective,
        NumericWithDotDirective,
        NumericWithCommaDirective,
        FormatDecimalDirective,
        ValidationBackgroundDirective,
        TwoDigitDecimaNumberDirective,
        StartWithNumberDirective,
        NumericWithExponentialDirective,
        ValidationBorderDirective
    ],
    imports: [],
    exports: [
        LimitToDirective,
        OnlyAlphabetsDirective,
        OnlyAlphaNumericDirective,
        OnlyNumericDirective,
        AllowSpecialCharactersDirective,
        NumericWithDecimalDirective,
        NumericWithDotDirective,
        NumericWithCommaDirective,
        FormatDecimalDirective,
        ValidationBackgroundDirective,
        TwoDigitDecimaNumberDirective,
        StartWithNumberDirective,
        NumericWithExponentialDirective,
        ValidationBorderDirective
    ]
})
export class DirectivesModule { }

