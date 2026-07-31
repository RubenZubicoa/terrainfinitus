import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  GourmetSectionId,
  Product,
  ProductCategory,
} from '../../../shared/models/product.models';

interface GourmetApiProduct {
  _id: string;
  category: ProductCategory;
  sectionId: GourmetSectionId;
  nameKey: string;
  descriptionKey: string;
  image: string;
  price: number;
  active?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Gourmet {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/api/gourmet';

  getProducts() {
    return this.http
      .get<GourmetApiProduct[]>(`${this.apiUrl}/products`)
      .pipe(map((products) => products.filter((product) => product.active !== false).map(toProduct)));
  }

  getProductsBySection(sectionId: GourmetSectionId) {
    return this.http
      .get<GourmetApiProduct[]>(`${this.apiUrl}/products?sectionId=${sectionId}`)
      .pipe(map((products) => products.filter((product) => product.active !== false).map(toProduct)));
  }

  getProductById(id: string) {
    return this.http.get<GourmetApiProduct | null>(`${this.apiUrl}/products/${id}`).pipe(
      map((product) => (product ? toProduct(product) : undefined)),
    );
  }
}

function toProduct(product: GourmetApiProduct): Product {
  return {
    id: product._id,
    category: product.category,
    gourmetSection: product.sectionId,
    nameKey: product.nameKey,
    descriptionKey: product.descriptionKey,
    image: product.image,
    price: product.price,
  };
}
