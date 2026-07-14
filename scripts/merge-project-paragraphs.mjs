import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { projectParagraphs } from './project-paragraphs-data.mjs';

const ROOT = process.cwd();

const SECTION_MAP = {
  bugarra: {
    estudioSocioeconomico: 'estudioSocioeconomico',
    elProyecto: 'elProyecto',
  },
  theLake: {
    historiaPesca: 'historiaPesca',
    estadisticas: 'estadisticas',
    tramosIntensivos: 'tramosIntensivos',
    nuestroProyecto: 'nuestroProyecto',
  },
};

function patchLang(lang) {
  const file = join(ROOT, 'public', 'i18n', `${lang}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const paragraphs = projectParagraphs[lang];

  if (!paragraphs) {
    console.warn(`No paragraphs for ${lang}, skipping`);
    return;
  }

  for (const [resortKey, sections] of Object.entries(SECTION_MAP)) {
    for (const [sectionKey, dataKey] of Object.entries(sections)) {
      const section = data.projects[resortKey].sections[sectionKey];
      section.paragraphs = paragraphs[resortKey][dataKey];
    }
  }

  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Merged paragraphs into ${lang}.json`);
}

for (const lang of ['es', 'en']) {
  patchLang(lang);
}
