export interface DestinationCategory {
  readonly id: string;
  readonly route: string;
  readonly imageSrc: string;
  readonly eyebrowKey: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly ctaKey: string;
  readonly altKey: string;
}

export const DESTINATION_CATEGORIES: readonly DestinationCategory[] = [
  {
    id: 'freshwater',
    route: '/destinations/agua-dulce',
    imageSrc: '/images/inicio/inicio10.jpg',
    eyebrowKey: 'destinations.categories.freshwater.eyebrow',
    titleKey: 'destinations.categories.freshwater.title',
    descriptionKey: 'destinations.categories.freshwater.description',
    ctaKey: 'destinations.categories.freshwater.cta',
    altKey: 'destinations.categories.freshwater.alt',
  },
  {
    id: 'saltwater',
    route: '/destinations/agua-salada',
    imageSrc: '/images/inicio/inicio5.jpg',
    eyebrowKey: 'destinations.categories.saltwater.eyebrow',
    titleKey: 'destinations.categories.saltwater.title',
    descriptionKey: 'destinations.categories.saltwater.description',
    ctaKey: 'destinations.categories.saltwater.cta',
    altKey: 'destinations.categories.saltwater.alt',
  },
  {
    id: 'warmwater',
    route: '/destinations/aguas-calidas',
    imageSrc: '/images/inicio/inicio3.jpg',
    eyebrowKey: 'destinations.categories.warmwater.eyebrow',
    titleKey: 'destinations.categories.warmwater.title',
    descriptionKey: 'destinations.categories.warmwater.description',
    ctaKey: 'destinations.categories.warmwater.cta',
    altKey: 'destinations.categories.warmwater.alt',
  },
] as const;
