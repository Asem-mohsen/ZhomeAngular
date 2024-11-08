import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinWithAnd',
  standalone: true
})
export class JoinWithAndPipe implements PipeTransform {

  transform(values: any[]): string {
    return values.map(value => value.market).join(', ').replace(/, ([^,]*)$/, ' and $1');
  }

}
