export interface BulletinIssue {
  id: string;
  number: number;
  titleKey: string;
  pdfPath?: string;
  imageSrc?: string;
}

export const BULLETIN_ISSUES: readonly BulletinIssue[] = [
  {
    id: 'boletin-1',
    number: 1,
    titleKey: 'bulletins.issues.boletin1.title',
    pdfPath: '/documents/boletines/boletin-1.pdf',
  },
] as const;
