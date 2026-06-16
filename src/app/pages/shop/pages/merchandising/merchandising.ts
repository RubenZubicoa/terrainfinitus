import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MERCHANDISING_PRODUCTS } from '../../data/products.data';
import { ProductList } from '../../../../shared/components/product-list/product-list';

@Component({
  selector: 'app-merchandising',
  imports: [TranslateModule, ProductList],
  templateUrl: './merchandising.html',
  styleUrl: './merchandising.scss',
})
export class Merchandising {
  readonly products = MERCHANDISING_PRODUCTS;
}
