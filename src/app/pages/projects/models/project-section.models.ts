import { NavItem } from '../../../core/models/nav-item.model';

export type ResortId = 'peralejos' | 'bugarra' | 'the-lake';

export type ProjectSectionContentType = 'paragraphs' | 'pending' | 'pdf';

export interface ProjectSection {
  id: string;
  translationKey: string;
  contentType: ProjectSectionContentType;
  pdfPath?: string;
  pdfLabelKey?: string;
  imageSrc?: string;
  imageAltKey?: string;
  /** Número de huecos reservados para imágenes que se añadirán más adelante. */
  imagePlaceholderCount?: number;
}

export interface ResortConfig {
  id: ResortId;
  route: string;
  translationKey: string;
  defaultSectionId: string;
  sections: readonly ProjectSection[];
}

export type ResortNavigationItem = NavItem;
