import { NavItem } from '../../../core/models/nav-item.model';
import { ProjectSection, ResortConfig, ResortId } from '../models/project-section.models';

const PERALEJOS_PDF =
  'https://firebasestorage.googleapis.com/v0/b/terrainfinitus-62208.firebasestorage.app/o/Volumen%20II%20final%20El%20Proyecto%20.pdf?alt=media&token=a488c9e8-e723-475b-ae28-5942d06585e9';

export const RESORT_BASE_PATH = '/proyectos';

export const RESORTS: readonly ResortConfig[] = [
  {
    id: 'peralejos',
    route: `${RESORT_BASE_PATH}/terra-peralejos`,
    translationKey: 'projects.peralejos',
    defaultSectionId: 'introduccion',
    sections: [
      {
        id: 'estudio-socioeconomico',
        translationKey: 'projects.peralejos.sections.estudioSocioeconomico',
        contentType: 'pdf',
        pdfPath: PERALEJOS_PDF,
        pdfLabelKey: 'projects.peralejos.pdfViewer',
      },
      {
        id: 'introduccion',
        translationKey: 'projects.peralejos.sections.introduccion',
        contentType: 'paragraphs',
      },
      {
        id: 'la-zona',
        translationKey: 'projects.peralejos.sections.laZona',
        contentType: 'paragraphs',
      },
      {
        id: 'quienes-somos',
        translationKey: 'projects.peralejos.sections.quienesSomos',
        contentType: 'paragraphs',
      },
      {
        id: 'sinergias',
        translationKey: 'projects.peralejos.sections.sinergias',
        contentType: 'paragraphs',
      },
      {
        id: 'edificaciones',
        translationKey: 'projects.peralejos.sections.edificaciones',
        contentType: 'paragraphs',
        imagePlaceholderCount: 4,
      },
      {
        id: 'terrenos',
        translationKey: 'projects.peralejos.sections.terrenos',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'servicios',
        translationKey: 'projects.peralejos.sections.servicios',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'restauracion',
        translationKey: 'projects.peralejos.sections.restauracion',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'otras-zonas',
        translationKey: 'projects.peralejos.sections.otrasZonas',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'tienda',
        translationKey: 'projects.peralejos.sections.tienda',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'paquetes-turisticos',
        translationKey: 'projects.peralejos.sections.paquetesTuristicos',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'reservas',
        translationKey: 'projects.peralejos.sections.reservas',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'suministros',
        translationKey: 'projects.peralejos.sections.suministros',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'helipuerto',
        translationKey: 'projects.peralejos.sections.helipuerto',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'domotica',
        translationKey: 'projects.peralejos.sections.domotica',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'seguridad',
        translationKey: 'projects.peralejos.sections.seguridad',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'programas',
        translationKey: 'projects.peralejos.sections.programas',
        contentType: 'paragraphs',
        imagePlaceholderCount: 3,
      },
      {
        id: 'situacion-turistica',
        translationKey: 'projects.peralejos.sections.situacionTuristica',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'web',
        translationKey: 'projects.peralejos.sections.web',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'staff',
        translationKey: 'projects.peralejos.sections.staff',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
      {
        id: 'gestion',
        translationKey: 'projects.peralejos.sections.gestion',
        contentType: 'paragraphs',
        imagePlaceholderCount: 2,
      },
    ],
  },
  {
    id: 'bugarra',
    route: `${RESORT_BASE_PATH}/terra-bugarra`,
    translationKey: 'projects.bugarra',
    defaultSectionId: 'el-proyecto',
    sections: [
      {
        id: 'estudio-socioeconomico',
        translationKey: 'projects.bugarra.sections.estudioSocioeconomico',
        contentType: 'paragraphs',
      },
      {
        id: 'el-proyecto',
        translationKey: 'projects.bugarra.sections.elProyecto',
        contentType: 'paragraphs',
        imageSrc: '/images/bugarra/bugarra.png',
        imageAltKey: 'projects.bugarra.imageAlt',
      },
    ],
  },
  {
    id: 'the-lake',
    route: `${RESORT_BASE_PATH}/the-lake`,
    translationKey: 'projects.theLake',
    defaultSectionId: 'nuestro-proyecto',
    sections: [
      {
        id: 'nuestro-proyecto',
        translationKey: 'projects.theLake.sections.nuestroProyecto',
        contentType: 'paragraphs',
        imageSrc: '/images/the-lake/logo-the-lake.png',
        imageAltKey: 'projects.theLake.logoAlt',
      },
      {
        id: 'historia-pesca',
        translationKey: 'projects.theLake.sections.historiaPesca',
        contentType: 'paragraphs',
      },
      {
        id: 'estadisticas',
        translationKey: 'projects.theLake.sections.estadisticas',
        contentType: 'paragraphs',
      },
      {
        id: 'tramos-intensivos',
        translationKey: 'projects.theLake.sections.tramosIntensivos',
        contentType: 'paragraphs',
      },
    ],
  },
] as const;

export function getResortById(resortId: ResortId): ResortConfig | undefined {
  return RESORTS.find((resort) => resort.id === resortId);
}

export function getResortSections(resortId: ResortId): readonly ProjectSection[] {
  return getResortById(resortId)?.sections ?? [];
}

export function buildResortNavigationChildren(resortId: ResortId): NavItem[] {
  return getResortSections(resortId).map((section) => ({
    labelKey: `${section.translationKey}.title`,
    route: getResortById(resortId)?.route,
    fragment: section.id,
  }));
}

export function buildResortsNavigationChildren(): NavItem[] {
  return [
    { labelKey: 'nav.idea', route: `${RESORT_BASE_PATH}/la-idea` },
    {
      labelKey: 'nav.peralejosHotel',
      route: `${RESORT_BASE_PATH}/terra-peralejos`,
      children: buildResortNavigationChildren('peralejos'),
    },
    {
      labelKey: 'nav.bugarraResort',
      route: `${RESORT_BASE_PATH}/terra-bugarra`,
      children: buildResortNavigationChildren('bugarra'),
    },
    {
      labelKey: 'nav.theLake',
      route: `${RESORT_BASE_PATH}/the-lake`,
      children: buildResortNavigationChildren('the-lake'),
    },
  ];
}
