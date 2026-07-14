import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  DEFAULT_GOURMET_SECTION,
  GOURMET_BASE_ROUTE,
  GOURMET_SECTIONS,
} from '../../data/gourmet-sections.data';
import { getGourmetProductsBySection } from '../../data/products.data';
import { GourmetSection, GourmetSectionId } from '../../../../shared/models/product.models';
import { ProductList } from '../../../../shared/components/product-list/product-list';

@Component({
  selector: 'app-gourmet',
  imports: [TranslateModule, ProductList, RouterLink],
  templateUrl: './gourmet.html',
  styleUrl: './gourmet.scss',
})
export class Gourmet implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly sections = GOURMET_SECTIONS;
  readonly gourmetBaseRoute = GOURMET_BASE_ROUTE;
  readonly activeSection = computed(() => this.resolveActiveSection(this.fragment()));

  private readonly fragment = signal<string | null>(null);

  readonly activeSectionData = computed((): GourmetSection | undefined =>
    this.sections.find((section) => section.id === this.activeSection()),
  );

  ngOnInit(): void {
    this.route.fragment.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fragment) => {
      this.fragment.set(fragment);
    });
  }

  productsForSection(sectionId: GourmetSectionId) {
    return getGourmetProductsBySection(sectionId);
  }

  productCount(sectionId: GourmetSectionId): number {
    return this.productsForSection(sectionId).length;
  }

  isActiveSection(sectionId: GourmetSectionId): boolean {
    return this.activeSection() === sectionId;
  }

  isMalvasiaSection(section: GourmetSection): boolean {
    return section.id === 'productos-pato';
  }

  private resolveActiveSection(fragment: string | null): GourmetSectionId {
    if (fragment && this.sections.some((section) => section.id === fragment)) {
      return fragment as GourmetSectionId;
    }

    return DEFAULT_GOURMET_SECTION;
  }
}
