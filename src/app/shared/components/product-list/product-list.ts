import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe, RouterLink, TranslateModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  readonly products = input.required<readonly Product[]>();
  readonly listAriaKey = input('shop.productListAria');
  readonly emptyKey = input('shop.empty');
  readonly detailRoutePrefix = input<string | null>(null);
  readonly viewDetailsKey = input('shop.detail.viewDetails');
}
