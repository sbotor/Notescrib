import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date) {
    return new DatePipe('en-US').transform(value, 'd MMM y, h:mm a');
  }

}
