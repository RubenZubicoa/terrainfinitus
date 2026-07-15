import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { getResortById } from '../../data/project-sections.data';
import { ProjectSection, ResortId } from '../../models/project-section.models';
import { PdfViewer } from '../../../../shared/components/pdf-viewer/pdf-viewer';

@Component({
  selector: 'app-resort',
  imports: [TranslateModule, RouterLink, PdfViewer],
  templateUrl: './resort.html',
  styleUrl: './resort.scss',
})
export class Resort {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly resortId = signal<ResortId>('peralejos');
  readonly resort = computed(() => getResortById(this.resortId()));
  readonly sections = computed(() => this.resort()?.sections ?? []);
  readonly resortRoute = computed(() => this.resort()?.route ?? '/proyectos');
  readonly activeSection = computed(() => this.resolveActiveSection(this.fragment()));

  private readonly fragment = signal<string | null>(null);

  readonly activeSectionData = computed((): ProjectSection | undefined =>
    this.sections().find((section) => section.id === this.activeSection()),
  );

  ngOnInit(): void {
    const resortId = this.route.snapshot.data['resortId'] as ResortId;
    this.resortId.set(resortId);

    this.route.fragment.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((fragment) => {
      this.fragment.set(fragment);
    });
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection() === sectionId;
  }

  onSectionChange(event: Event): void {
    const sectionId = (event.target as HTMLSelectElement).value;
    void this.router.navigate([this.resortRoute()], { fragment: sectionId });
  }

  private resolveActiveSection(fragment: string | null): string {
    const defaultSection = this.resort()?.defaultSectionId ?? this.sections()[0]?.id;
    if (fragment && this.sections().some((section) => section.id === fragment)) {
      return fragment;
    }

    return defaultSection ?? '';
  }
}
