import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SHOP_BASE_PATH, SHOP_THE_LAKE_URL } from '../../data/shop-paths';

@Component({
  selector: 'app-shop-landing',
  imports: [RouterLink, TranslateModule],
  templateUrl: './shop-landing.html',
  styleUrl: './shop-landing.scss',
})
export class ShopLanding {
  readonly gourmetRoute = `${SHOP_BASE_PATH}/gourmet`;
  readonly merchandisingRoute = `${SHOP_BASE_PATH}/merchandising`;
  readonly theLakeUrl = SHOP_THE_LAKE_URL;
}
