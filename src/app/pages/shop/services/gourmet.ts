import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  GourmetSectionId,
  Product,
  ProductCategory,
} from '../../../shared/models/product.models';
import { GOURMET_PRODUCTS, getGourmetProductsBySection } from '../data/products.data';

interface GourmetApiProduct {
  _id: string;
  category: ProductCategory;
  sectionId: GourmetSectionId;
  nameKey: string;
  descriptionKey: string;
  image: string;
  price: number;
  /** Campo en BD (español). */
  profesionalPrice?: number | null;
  /** Alias por si la API usa la forma en inglés. */
  professionalPrice?: number | null;
  active?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Gourmet {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.terrainfinitusApiUrl + '/api/gourmet';

  getProducts() {
    return this.http
      .get<GourmetApiProduct[]>(`${this.apiUrl}/products`)
      .pipe(
        map((products) => products.filter((product) => product.active !== false).map(toProduct)),
        catchError(() => of(GOURMET_PRODUCTS)),
      );
  }

  getProductsBySection(sectionId: GourmetSectionId) {
    return this.http
      .get<GourmetApiProduct[]>(`${this.apiUrl}/products?sectionId=${sectionId}`)
      .pipe(
        map((products) => products.filter((product) => product.active !== false).map(toProduct)),
        catchError(() => of(getGourmetProductsBySection(sectionId))),
      );
  }

  getProductById(id: string) {
    return this.http.get<GourmetApiProduct | null>(`${this.apiUrl}/products/${id}`).pipe(
      map((product) => (product ? toProduct(product) : undefined)),
      catchError(() => of(GOURMET_PRODUCTS.find((product) => product.id === id))),
    );
  }
}

function toProduct(product: GourmetApiProduct): Product {
  const professionalPrice = resolveProfessionalPrice(
    product.profesionalPrice ?? product.professionalPrice,
  );

  return {
    id: product._id,
    category: product.category,
    gourmetSection: product.sectionId,
    nameKey: product.nameKey,
    descriptionKey: product.descriptionKey,
    image: product.image,
    price: product.price,
    ...(professionalPrice !== undefined ? { professionalPrice } : {}),
  };
}

function resolveProfessionalPrice(fromApi?: number | null): number | undefined {
  if (typeof fromApi === 'number' && Number.isFinite(fromApi) && fromApi > 0) {
    return fromApi;
  }

  return undefined;
}
