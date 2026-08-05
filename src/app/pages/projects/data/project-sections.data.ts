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
        pdfPath: '/documents/peralejos/introduccion-al-proyecto.pdf',
        pdfLabelKey: 'projects.peralejos.pdfIntroViewer',
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
