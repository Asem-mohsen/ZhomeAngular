import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../Interfaces/product';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(products : Product[] ,selectedFilters: any): Product[] {

    const { category, brand, platform, technology , minPrice , maxPrice } = selectedFilters;

    return products.filter(product => {

      // Filter based on selected categories
      const matchesCategory = !category.length || category.includes(product.subcategory.MainCategoryID);

      // Filter based on selected brands
      const matchesBrand = !brand.length || brand.includes(product.BrandID);

      // Filter based on selected platforms
      const matchesPlatform = !platform.length || product.platforms.some(p => platform.includes(p.ID));

      // Filter based on selected technologies
      const matchesTechnology = !technology.length || product.technologies.some(t => technology.includes(t.Technology));

      // Filter based on price
      const matchesPrice = product.Price >= minPrice && product.Price <= maxPrice;

      // Return products that match all selected filters
      return matchesCategory && matchesBrand && matchesPlatform && matchesTechnology && matchesPrice;
    });

  }

}
