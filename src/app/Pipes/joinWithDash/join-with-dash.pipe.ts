import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinWithDash',
  standalone: true
})
export class JoinWithDashPipe implements PipeTransform {

  transform(values: any[]): string {
    return values.map(value => '0' + value.phone).join(' - ');
  }

}
