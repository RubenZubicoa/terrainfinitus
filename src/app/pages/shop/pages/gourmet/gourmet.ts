import { ViewportScroller } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { GOURMET_SECTIONS } from '../../data/gourmet-sections.data';
import { getGourmetProductsBySection } from '../../data/products.data';
import { GourmetSectionId } from '../../../../shared/models/product.models';
import { ProductList } from '../../../../shared/components/product-list/product-list';

@Component({
  selector: 'app-gourmet',
  imports: [TranslateModule, ProductList],
  templateUrl: './gourmet.html',
  styleUrl: './gourmet.scss',
})
export class Gourmet implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly destroyRef = inject(DestroyRef);

  readonly sections = GOURMET_SECTIONS;
  readonly expandedSections = signal<ReadonlySet<GourmetSectionId>>(new Set());

  ngOnInit(): void {
    this.route.fragment
      .pipe(
        filter((fragment): fragment is string => !!fragment),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((fragment) => {
        this.expandSection(fragment as GourmetSectionId);
        queueMicrotask(() => this.scrollToSection(fragment));
      });
  }

  productsForSection(sectionId: GourmetSectionId) {
    return getGourmetProductsBySection(sectionId);
  }

  productCount(sectionId: GourmetSectionId): number {
    return this.productsForSection(sectionId).length;
  }

  isExpanded(sectionId: GourmetSectionId): boolean {
    return this.expandedSections().has(sectionId);
  }

  toggleSection(sectionId: GourmetSectionId): void {
    this.expandedSections.update((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }

  expandSection(sectionId: GourmetSectionId): void {
    if (!this.sections.some((section) => section.id === sectionId)) {
      return;
    }

    this.expandedSections.update((current) => new Set(current).add(sectionId));
  }

  scrollToSection(sectionId: string): void {
    this.expandSection(sectionId as GourmetSectionId);

    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
