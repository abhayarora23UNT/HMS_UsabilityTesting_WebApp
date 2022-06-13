import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDateFormat' })

export class CustomDatePipe implements PipeTransform {

    transform(strDate: string): string {
        const date: any = new Date(strDate);
        let dd: any = date.getDate();
        const mmm: any = date.toLocaleString('default', { month: 'short' });
        const yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        return mmm + ' ' + dd + ', ' + yyyy;
    }
}
