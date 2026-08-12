import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CART_CATEGORY_ORDER,
  isCartEligibleCategory,
} from '../../pages/shop/data/shop-paths';
import { CartItemView, CartLine } from '../models/cart.models';
import { Product, ProductCategory } from '../../shared/models/product.models';
import { CurrentUserService } from './current-user-service';

const CART_STORAGE_KEY = 'ti_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly currentUserService = inject(CurrentUserService);
  private readonly _lines = signal<CartLine[]>(this.loadLines());

  readonly items = computed<CartItemView[]>(() =>
    this._lines().map((line) => {
      const unitPrice = this.resolveUnitPrice(line.product);
      return {
        product: line.product,
        quantity: line.quantity,
        lineTotal: unitPrice * line.quantity,
      };
    }),
  );

  readonly itemCount = computed(() =>
    this._lines().reduce((total, line) => total + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.lineTotal, 0),
  );

  readonly isEmpty = computed(() => this.itemCount() === 0);

  readonly groupedItems = computed(() => {
    const byCategory = new Map<ProductCategory, CartItemView[]>();

    for (const item of this.items()) {
      const categoryItems = byCategory.get(item.product.category) ?? [];
      categoryItems.push(item);
      byCategory.set(item.product.category, categoryItems);
    }

    return CART_CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
      category,
      items: byCategory.get(category)!,
    }));
  });

  addItem(product: Product, quantity = 1): void {
    if (quantity < 1 || !isCartEligibleCategory(product.category)) {
      return;
    }

    this._lines.update((lines) => {
      const existing = lines.find((line) => line.productId === product.id);
      if (existing) {
        return lines.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: line.quantity + quantity, product }
            : line,
        );
      }
      return [...lines, { productId: product.id, quantity, product }];
    });

    this.persist();
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    this._lines.update((lines) =>
      lines.map((line) => (line.productId === productId ? { ...line, quantity } : line)),
    );
    this.persist();
  }

  removeItem(productId: string): void {
    this._lines.update((lines) => lines.filter((line) => line.productId !== productId));
    this.persist();
  }

  removeItemsByCategory(category: ProductCategory): void {
    this._lines.update((lines) => lines.filter((line) => line.product.category !== category));
    this.persist();
  }

  clear(): void {
    this._lines.set([]);
    this.persist();
  }

  private loadLines(): CartLine[] {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored) as CartLine[];
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter(
        (line) =>
          typeof line.productId === 'string' &&
          typeof line.quantity === 'number' &&
          line.quantity > 0 &&
          line.product &&
          typeof line.product.id === 'string' &&
          typeof line.product.price === 'number',
      );
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._lines()));
  }

  private resolveUnitPrice(product: Product): number {
    if (this.currentUserService.isProfessional() && product.professionalPrice != null) {
      return product.professionalPrice;
    }
    return product.price;
  }
}
