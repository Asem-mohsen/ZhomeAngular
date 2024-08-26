import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../Interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList : Product[] ,word: string): Product[] {

    return productList.filter( (product)=> product.Name.toLowerCase().includes(word.toLowerCase()) );

  }

}
