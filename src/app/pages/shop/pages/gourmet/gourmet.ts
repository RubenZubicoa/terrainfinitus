import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import {
  DEFAULT_GOURMET_SECTION,
  GOURMET_BASE_ROUTE,
  GOURMET_SECTIONS,
} from '../../data/gourmet-sections.data';
import { GourmetSection, GourmetSectionId, Product } from '../../../../shared/models/product.models';
import { ProductList } from '../../../../shared/components/product-list/product-list';
import { Gourmet as GourmetService } from '../../services/gourmet';

@Component({
  selector: 'app-gourmet',
  imports: [TranslateModule, ProductList, RouterLink],
  templateUrl: './gourmet.html',
  styleUrl: './gourmet.scss',
})
export class Gourmet implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly gourmetService = inject(GourmetService);

  readonly sections = GOURMET_SECTIONS;
  readonly gourmetBaseRoute = GOURMET_BASE_ROUTE;
  readonly activeSection = computed(() => this.resolveActiveSection(this.fragment()));

  private readonly fragment = signal<string | null>(null);
  private readonly products = signal<Product[]>([]);

  readonly activeSectionData = computed((): GourmetSection | undefined =>
    this.sections.find((section) => section.id === this.activeSection()),
  );

  ngOnInit(): void {
    this.route.fragment.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fragment) => {
      this.fragment.set(fragment);
    });

    this.gourmetService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => this.products.set(products));
  }

  productsForSection(sectionId: GourmetSectionId): Product[] {
    return this.products().filter((product) => product.gourmetSection === sectionId);
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

  safePresentationVideoUrl(url?: string): SafeResourceUrl | null {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  onSectionChange(event: Event): void {
    const sectionId = (event.target as HTMLSelectElement).value as GourmetSectionId;
    void this.router.navigate([this.gourmetBaseRoute], { fragment: sectionId });
  }

  private resolveActiveSection(fragment: string | null): GourmetSectionId {
    if (fragment && this.sections.some((section) => section.id === fragment)) {
      return fragment as GourmetSectionId;
    }

    return DEFAULT_GOURMET_SECTION;
  }
}
