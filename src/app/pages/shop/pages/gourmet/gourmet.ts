import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GOURMET_PRODUCTS } from '../../data/products.data';
import { ProductList } from '../../../../shared/components/product-list/product-list';

@Component({
  selector: 'app-gourmet',
  imports: [TranslateModule, ProductList],
  templateUrl: './gourmet.html',
  styleUrl: './gourmet.scss',
})
export class Gourmet {
  readonly products = GOURMET_PRODUCTS;
}
