import { Pipe, PipeTransform } from '@angular/core';
import { Product, Technology } from '../../Interfaces/product';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(products : Product[] ,selectedFilters: any): Product[] {

    const { category, brand, platform, technology , minPrice , maxPrice } = selectedFilters;

    return products.filter(product => {

      // Filter based on selected categories
      const matchesCategory = !category.length || category.includes(product.subcategory.category_id);

      // Filter based on selected brands
      const matchesBrand = !brand.length || brand.includes(product.brand_id);

      // Filter based on selected platforms
      const matchesPlatform = !platform.length || product.platforms.some(p => platform.includes(p.id));

      // Filter based on selected technologies
      const matchesTechnology = !technology.length ||
        (product.technologies && product.technologies.some((t: { name: string }) => technology.includes(t.name)));

      // Filter based on price
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      // Return products that match all selected filters
      return matchesCategory && matchesBrand && matchesPlatform && matchesTechnology && matchesPrice;
    });

  }

}
