import { computed, Injectable, signal } from '@angular/core';
import { getProductById } from '../../pages/shop/data/products.data';
import {
  CART_CATEGORY_ORDER,
  isCartEligibleCategory,
} from '../../pages/shop/data/shop-paths';
import { CartItemView, CartLine } from '../models/cart.models';
import { ProductCategory } from '../../shared/models/product.models';

const CART_STORAGE_KEY = 'ti_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _lines = signal<CartLine[]>(this.loadLines());

  readonly items = computed<CartItemView[]>(() =>
    this._lines()
      .map((line) => {
        const product = getProductById(line.productId);
        if (!product) {
          return null;
        }
        return {
          product,
          quantity: line.quantity,
          lineTotal: product.price * line.quantity,
        };
      })
      .filter((item): item is CartItemView => item !== null),
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

  addItem(productId: string, quantity = 1): void {
    if (quantity < 1) {
      return;
    }

    const product = getProductById(productId);
    if (!product || !isCartEligibleCategory(product.category)) {
      return;
    }

    this._lines.update((lines) => {
      const existing = lines.find((line) => line.productId === productId);
      if (existing) {
        return lines.map((line) =>
          line.productId === productId
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [...lines, { productId, quantity }];
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
      return Array.isArray(parsed)
        ? parsed.filter(
            (line) =>
              typeof line.productId === 'string' &&
              typeof line.quantity === 'number' &&
              line.quantity > 0,
          )
        : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this._lines()));
  }
}
