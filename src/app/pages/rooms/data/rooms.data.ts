import {
  Hotel,
  HotelId,
  Reservation,
  Room,
  RoomImage,
  RoomType,
  RoomTypeDefinition,
} from '../models/room.models';

const GALLERY_ALT = 'rooms.detail.galleryImage';

const gallery = (...sources: string[]): RoomImage[] =>
  sources.map((src) => ({ src, altKey: GALLERY_ALT }));

export const ROOM_TYPES: RoomTypeDefinition[] = [
  { id: 'junior-suite', labelKey: 'rooms.types.juniorSuite' },
  { id: 'suite', labelKey: 'rooms.types.suite' },
  { id: 'presidential', labelKey: 'rooms.types.presidential' },
  { id: 'commodore', labelKey: 'rooms.types.commodore' },
];

const TERRAZA_TYPE: RoomTypeDefinition = {
  id: 'terraza',
  labelKey: 'rooms.types.terraza',
  showWhenEmpty: true,
};
const TERRAZA_SUITE_TYPE: RoomTypeDefinition = {
  id: 'terraza-suite',
  labelKey: 'rooms.types.terrazaSuite',
  showWhenEmpty: true,
};
const BUNGALOW_TYPE: RoomTypeDefinition = {
  id: 'bungalow',
  labelKey: 'rooms.types.bungalow',
  showWhenEmpty: true,
};

const PERALEJOS_ROOM_TYPES: RoomTypeDefinition[] = [
  ...ROOM_TYPES,
  TERRAZA_TYPE,
  TERRAZA_SUITE_TYPE,
  BUNGALOW_TYPE,
];

export const ALL_ROOM_TYPES: RoomTypeDefinition[] = [
  ...ROOM_TYPES,
  TERRAZA_TYPE,
  TERRAZA_SUITE_TYPE,
  BUNGALOW_TYPE,
];

const HOTEL_ROOM_TYPES: Record<HotelId, RoomTypeDefinition[]> = {
  peralejos: PERALEJOS_ROOM_TYPES,
  bugarra: [BUNGALOW_TYPE],
  'the-lake': ROOM_TYPES,
};

export const HOTELS: Hotel[] = [
  {
    id: 'peralejos',
    nameKey: 'rooms.hotels.peralejos.name',
    locationKey: 'rooms.hotels.peralejos.location',
    image: '/images/inicio/inicio1.jpeg',
    catalogLayout: 'grouped',
  },
  {
    id: 'bugarra',
    nameKey: 'rooms.hotels.bugarra.name',
    locationKey: 'rooms.hotels.bugarra.location',
    image: '/images/bugarra/bugarra.png',
    catalogLayout: 'flat',
  },
  {
    id: 'the-lake',
    nameKey: 'rooms.hotels.theLake.name',
    locationKey: 'rooms.hotels.theLake.location',
    image: '/images/the-lake/the-lake-1.jpg',
    catalogLayout: 'preparation',
  },
];

type RoomSeed = Omit<Room, 'id' | 'hotelId' | 'type' | 'roomNumber' | 'nameKey'> & {
  nameKey: string;
};

const seed = (
  hotelId: HotelId,
  type: RoomType,
  roomNumber: string,
  nameKey: string,
  data: Omit<RoomSeed, 'nameKey'>,
  idRoomNumber = roomNumber,
): Room => ({
  id: `${hotelId}-${type}-${idRoomNumber}`,
  hotelId,
  type,
  roomNumber,
  nameKey,
  ...data,
});

const BUGARRA_IMAGES = [
  '/images/bugarra/bugarra.png',
  '/images/inicio/inicio5.jpg',
  '/images/inicio/inicio7.jpg',
  '/images/inicio/inicio3.jpeg',
  '/images/inicio/inicio6.jpg',
];

const PERALEJOS_BUNGALOW_IMAGES = [
  '/images/inicio/inicio1.jpeg',
  '/images/inicio/inicio5.jpg',
  '/images/inicio/inicio7.jpg',
  '/images/inicio/inicio3.jpeg',
  '/images/inicio/inicio6.jpg',
];

const peralejosTipoABungalows = (): Room[] => {
  const base = {
    descriptionKey: 'rooms.catalog.gardenBungalow.description',
    detailKey: 'rooms.catalog.gardenBungalow.detail',
    bedTypeKey: 'rooms.catalog.gardenBungalow.bedType',
    viewKey: 'rooms.catalog.gardenBungalow.view',
    bathroomKey: 'rooms.catalog.gardenBungalow.bathroom',
    amenityKeys: [
      'rooms.amenities.privateGarden',
      'rooms.amenities.fireplace',
      'rooms.amenities.outdoorShower',
    ],
    featureKeys: ['rooms.features.gourmetBreakfast', 'rooms.features.flexibleCancellation'],
  };

  return Array.from({ length: 14 }, (_, index) => {
    const num = String(index + 1);
    const unitKey = `perA${num.padStart(2, '0')}`;
    const image = PERALEJOS_BUNGALOW_IMAGES[index % PERALEJOS_BUNGALOW_IMAGES.length];
    const galleryImages = [
      image,
      PERALEJOS_BUNGALOW_IMAGES[(index + 1) % PERALEJOS_BUNGALOW_IMAGES.length],
      PERALEJOS_BUNGALOW_IMAGES[(index + 2) % PERALEJOS_BUNGALOW_IMAGES.length],
    ];

    return seed(
      'peralejos',
      'bungalow',
      num,
      `rooms.units.${unitKey}.name`,
      {
        ...base,
        image,
        images: gallery(...galleryImages),
        sizeM2: 75,
        capacity: 2,
        pricePerNight: 340 + (index % 3) * 10,
      },
      `a-${num}`,
    );
  });
};

const peralejosBungalows = (): Room[] => {
  const base = {
    descriptionKey: 'rooms.catalog.gardenBungalow.description',
    detailKey: 'rooms.catalog.gardenBungalow.detail',
    bedTypeKey: 'rooms.catalog.gardenBungalow.bedType',
    viewKey: 'rooms.catalog.gardenBungalow.view',
    bathroomKey: 'rooms.catalog.gardenBungalow.bathroom',
    amenityKeys: [
      'rooms.amenities.privateGarden',
      'rooms.amenities.fireplace',
      'rooms.amenities.outdoorShower',
    ],
    featureKeys: ['rooms.features.gourmetBreakfast', 'rooms.features.flexibleCancellation'],
  };

  return Array.from({ length: 11 }, (_, index) => {
    const num = String(index + 1);
    const unitKey = `perB${num.padStart(2, '0')}`;
    const image = PERALEJOS_BUNGALOW_IMAGES[index % PERALEJOS_BUNGALOW_IMAGES.length];
    const galleryImages = [
      image,
      PERALEJOS_BUNGALOW_IMAGES[(index + 1) % PERALEJOS_BUNGALOW_IMAGES.length],
      PERALEJOS_BUNGALOW_IMAGES[(index + 2) % PERALEJOS_BUNGALOW_IMAGES.length],
    ];

    return seed('peralejos', 'bungalow', num, `rooms.units.${unitKey}.name`, {
      ...base,
      image,
      images: gallery(...galleryImages),
      sizeM2: 80,
      capacity: 2,
      pricePerNight: 360 + (index % 3) * 10,
    });
  });
};

const bugarraBungalows = (): Room[] => {
  const base = {
    descriptionKey: 'rooms.catalog.gardenBungalow.description',
    detailKey: 'rooms.catalog.gardenBungalow.detail',
    bedTypeKey: 'rooms.catalog.gardenBungalow.bedType',
    viewKey: 'rooms.catalog.gardenBungalow.view',
    bathroomKey: 'rooms.catalog.gardenBungalow.bathroom',
    amenityKeys: [
      'rooms.amenities.privateGarden',
      'rooms.amenities.fireplace',
      'rooms.amenities.outdoorShower',
    ],
    featureKeys: ['rooms.features.gourmetBreakfast', 'rooms.features.flexibleCancellation'],
  };

  return Array.from({ length: 14 }, (_, index) => {
    const num = String(index + 1).padStart(2, '0');
    const image = BUGARRA_IMAGES[index % BUGARRA_IMAGES.length];
    const galleryImages = [
      image,
      BUGARRA_IMAGES[(index + 1) % BUGARRA_IMAGES.length],
      BUGARRA_IMAGES[(index + 2) % BUGARRA_IMAGES.length],
    ];

    return seed('bugarra', 'bungalow', num, `rooms.units.bug${num}.name`, {
      ...base,
      image,
      images: gallery(...galleryImages),
      sizeM2: 80,
      capacity: index % 5 === 0 ? 3 : 2,
      pricePerNight: 340 + (index % 3) * 15,
    });
  });
};

export const ROOMS: Room[] = [
  // —— Terra Peralejos ——
  seed('peralejos', 'suite', '101', 'rooms.units.per101.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/habitaciones/habitacion1.png',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 106.08,
    capacity: 2,
    pricePerNight: 310,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.gardenView', 'rooms.amenities.minibar', 'rooms.amenities.rainShower', 'rooms.amenities.terrace'],
    featureKeys: ['rooms.features.gourmetBreakfast', 'rooms.features.turndownService', 'rooms.features.flexibleCancellation'],
  }),
  seed('peralejos', 'suite', '102', 'rooms.units.per102.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio5.jpg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 107.55,
    capacity: 2,
    pricePerNight: 295,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.gardenView', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.gourmetBreakfast', 'rooms.features.flexibleCancellation'],
  }),
  seed('peralejos', 'suite', '103', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 106.50,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '104', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 91.76,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'presidential', '105', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 113.26,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '201', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 97.02,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '202', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.41,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '203', 'rooms.units.per103.name', {
    descriptionKey: 'rooms.catalog.lagoonJunior.description',
    detailKey: 'rooms.catalog.lagoonJunior.detail',
    image: '/images/inicio/inicio3.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 97.13,
    capacity: 2,
    pricePerNight: 320,
    bedTypeKey: 'rooms.catalog.lagoonJunior.bedType',
    viewKey: 'rooms.catalog.lagoonJunior.view',
    bathroomKey: 'rooms.catalog.lagoonJunior.bathroom',
    amenityKeys: ['rooms.amenities.terrace', 'rooms.amenities.minibar', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.turndownService', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'presidential', '204', 'rooms.units.per201.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 110.85,
    capacity: 2,
    pricePerNight: 420,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.spa', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.lateCheckout', 'rooms.features.roomService24h', 'rooms.features.personalConcierge'],
  }),
  seed('peralejos', 'junior-suite', '205', 'rooms.units.per202.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio6.jpg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 88.78,
    capacity: 2,
    pricePerNight: 400,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.spa', 'rooms.amenities.rainShower'],
    featureKeys: ['rooms.features.lateCheckout', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '206', 'rooms.units.per203.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio7.jpg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 86.00,
    capacity: 2,
    pricePerNight: 450,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.lounge', 'rooms.amenities.spa', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.roomService24h', 'rooms.features.personalConcierge'],
  }),
  seed('peralejos', 'suite', '301', 'rooms.units.per401.name', {
    descriptionKey: 'rooms.catalog.presidential.description',
    detailKey: 'rooms.catalog.presidential.detail',
    image: '/images/inicio/inicio6.jpg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 180,
    capacity: 2,
    pricePerNight: 890,
    bedTypeKey: 'rooms.catalog.presidential.bedType',
    viewKey: 'rooms.catalog.presidential.view',
    bathroomKey: 'rooms.catalog.presidential.bathroom',
    amenityKeys: ['rooms.amenities.privatePool', 'rooms.amenities.butler', 'rooms.amenities.lounge', 'rooms.amenities.kingBed'],
    featureKeys: ['rooms.features.privateTransfer', 'rooms.features.personalConcierge', 'rooms.features.lateCheckout'],
  }),
  seed('peralejos', 'suite', '302', 'rooms.units.per402.name', {
    descriptionKey: 'rooms.catalog.presidential.description',
    detailKey: 'rooms.catalog.presidential.detail',
    image: '/images/inicio/inicio8.jpg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.41,
    capacity: 2,
    pricePerNight: 850,
    bedTypeKey: 'rooms.catalog.presidential.bedType',
    viewKey: 'rooms.catalog.presidential.view',
    bathroomKey: 'rooms.catalog.presidential.bathroom',
    amenityKeys: ['rooms.amenities.privatePool', 'rooms.amenities.butler', 'rooms.amenities.spa', 'rooms.amenities.lounge'],
    featureKeys: ['rooms.features.privateTransfer', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '303', 'rooms.units.per501.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio1.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 97.13,
    capacity: 2,
    pricePerNight: 520,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.butler', 'rooms.amenities.lounge', 'rooms.amenities.spa'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.lateCheckout', 'rooms.features.privateTransfer'],
  }),
  seed('peralejos', 'presidential', '304', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 110.85,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'junior-suite', '305', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 88.78,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'junior-suite', '306', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 86.00,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '401', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 97.02,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '402', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 97.13,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'suite', '403', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.41,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'presidential', '404', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 110.85,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'junior-suite', '405', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 88.78,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'junior-suite', '406', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 86.00,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'junior-suite', 'B1', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 76.17,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),
  seed('peralejos', 'terraza', 'B1', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 10.92,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'junior-suite', 'B2', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 63.84,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza', 'B2', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 10.21,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'suite', '101', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.55,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '101', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 24.91,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'suite', '102', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 93.77,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '102', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 27.30,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'suite', '201', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.55,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '201', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 24.91,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'suite', '202', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 93.77,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '202', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 27.30,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  
  seed('peralejos', 'suite', '301', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 101.55,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '301', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 24.91,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'suite', '302', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 93.77,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza-suite', '302', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 27.30,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'commodore', 'C1', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 233.63,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  seed('peralejos', 'terraza', 'C1', 'rooms.units.per502.name', {
    descriptionKey: 'rooms.catalog.tajoSuite.description',
    detailKey: 'rooms.catalog.tajoSuite.detail',
    image: '/images/inicio/inicio2.jpeg',
    images: gallery('/images/habitaciones/habitacion1.png', '/images/habitaciones/habitacion2.png', '/images/habitaciones/habitacion3.png', '/images/habitaciones/habitacion4.png', '/images/habitaciones/habitacion5.png', '/images/habitaciones/habitacion6.png', '/images/habitaciones/habitacion7.png', '/images/habitaciones/habitacion8.png'),
    sizeM2: 52.21,
    capacity: 2,
    pricePerNight: 510,
    bedTypeKey: 'rooms.catalog.tajoSuite.bedType',
    viewKey: 'rooms.catalog.tajoSuite.view',
    bathroomKey: 'rooms.catalog.tajoSuite.bathroom',
    amenityKeys: ['rooms.amenities.kingBed', 'rooms.amenities.terrace', 'rooms.amenities.lounge', 'rooms.amenities.minibar'],
    featureKeys: ['rooms.features.personalConcierge', 'rooms.features.roomService24h', 'rooms.features.welcomeAmenities'],
  }),

  // ...peralejosTipoABungalows(),
  ...peralejosBungalows(),
  // —— Terra Bugarra ——
  ...bugarraBungalows(),
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-001',
    hotelId: 'peralejos',
    roomId: 'peralejos-suite-201',
    guestName: 'Elena Morales',
    checkIn: '2026-06-12',
    checkOut: '2026-06-16',
    guests: 2,
    status: 'confirmed',
    notes: '',
  },
  {
    id: 'res-002',
    hotelId: 'peralejos',
    roomId: 'peralejos-presidential-401',
    guestName: 'James Whitfield',
    checkIn: '2026-07-01',
    checkOut: '2026-07-08',
    guests: 3,
    status: 'pending',
    notes: 'Llegada tardía estimada.',
  },
  {
    id: 'res-003',
    hotelId: 'bugarra',
    roomId: 'bugarra-bungalow-03',
    guestName: 'Sophie Laurent',
    checkIn: '2026-05-20',
    checkOut: '2026-05-24',
    guests: 2,
    status: 'confirmed',
    notes: '',
  },
];

export function getRoomById(roomId: string): Room | undefined {
  return ROOMS.find((room) => room.id === roomId);
}

export function getHotelById(hotelId: HotelId): Hotel | undefined {
  return HOTELS.find((hotel) => hotel.id === hotelId);
}

export function getHotelRooms(hotelId: HotelId): Room[] {
  return ROOMS.filter((room) => room.hotelId === hotelId).sort((a, b) =>
    a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true }),
  );
}

export function getRoomTypeGroups(hotelId: HotelId): { type: RoomType; labelKey: string; rooms: Room[] }[] {
  return HOTEL_ROOM_TYPES[hotelId]
    .map((typeDef) => ({
      type: typeDef.id,
      labelKey: typeDef.labelKey,
      rooms: ROOMS.filter((room) => room.hotelId === hotelId && room.type === typeDef.id).sort(
        (a, b) => a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true }),
      ),
    }))
    .filter((group, index) => {
      const typeDef = HOTEL_ROOM_TYPES[hotelId][index];
      return group.rooms.length > 0 || typeDef.showWhenEmpty;
    });
}
