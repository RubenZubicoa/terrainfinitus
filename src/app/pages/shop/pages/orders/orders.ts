import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentUserService } from '../../../../core/services/current-user-service';
import { TokenService } from '../../../../core/services/token-service';
import { Product } from '../../../../shared/models/product.models';
import { GourmetOrder } from '../../models/GourmetOrder';
import { Gourmet as GourmetService } from '../../services/gourmet';
import { GourmetOrderService } from '../../services/gourmet-order';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink, TranslateModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private readonly router = inject(Router);
  private readonly gourmetOrderService = inject(GourmetOrderService);
  private readonly gourmetService = inject(GourmetService);
  private readonly currentUserService = inject(CurrentUserService);
  private readonly tokenService = inject(TokenService);

  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly orders = signal<GourmetOrder[]>([]);
  private readonly productsById = signal<Record<string, Product>>({});

  ngOnInit(): void {
    const user = this.currentUserService.user();
    if (!this.tokenService.isAuthenticated() || !user) {
      void this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/pedidos' },
      });
      return;
    }

    this.loadOrders(user.uuid);
  }

  protected productNameKey(productId: string): string | null {
    return this.productsById()[productId]?.nameKey ?? null;
  }

  protected statusKey(status: string): string {
    const normalized = status.trim().toLowerCase();
    const known = ['pending', 'confirmed', 'paid', 'shipped', 'cancelled', 'completed'];
    if (known.includes(normalized)) {
      return `orders.status.${normalized}`;
    }
    return 'orders.status.unknown';
  }

  private loadOrders(userId: string): void {
    this.loading.set(true);
    this.error.set(false);

    forkJoin({
      orders: this.gourmetOrderService.getGourmetOrdersByUserId(userId).pipe(
        catchError(() => {
          this.error.set(true);
          return of([] as GourmetOrder[]);
        }),
      ),
      products: this.gourmetService.getProducts().pipe(catchError(() => of([] as Product[]))),
    })
      .pipe(
        map(({ orders, products }) => {
          const byId = Object.fromEntries(products.map((product) => [product.id, product]));
          const sorted = [...orders].sort((a, b) => {
            const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
            const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
            return bTime - aTime;
          });
          return { orders: sorted, byId };
        }),
      )
      .subscribe(({ orders, byId }) => {
        this.productsById.set(byId);
        this.orders.set(orders);
        this.loading.set(false);
      });
  }
}
