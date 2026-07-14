import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LANGS = ['de', 'fr', 'it', 'pt', 'jp'];

const NAV_PATCH = {
  de: {
    resorts: 'Unsere Resorts',
    peralejosHotel: 'Terra Infinitus Peralejos 6-Sterne-Hotel',
    bugarraResort: 'Terra Infinitus Bugarra Luxusresort',
  },
  fr: {
    resorts: 'Nos Resorts',
    peralejosHotel: 'Hôtel 6 étoiles Terra Infinitus Peralejos',
    bugarraResort: 'Resort de luxe Terra Infinitus Bugarra',
  },
  it: {
    resorts: 'I nostri Resort',
    peralejosHotel: 'Hotel 6 stelle Terra Infinitus Peralejos',
    bugarraResort: 'Resort di lusso Terra Infinitus Bugarra',
  },
  pt: {
    resorts: 'Os nossos Resorts',
    peralejosHotel: 'Hotel 6 estrelas Terra Infinitus Peralejos',
    bugarraResort: 'Resort de luxo Terra Infinitus Bugarra',
  },
  jp: {
    resorts: 'Our Resorts',
    peralejosHotel: 'Terra Infinitus Peralejos 6つ星ホテル',
    bugarraResort: 'Terra Infinitus Bugarra ラグジュアリーリゾート',
  },
};

function patchLang(lang) {
  const file = join(ROOT, 'public', 'i18n', `${lang}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const navPatch = NAV_PATCH[lang];

  data.nav.resorts = navPatch.resorts;
  data.nav.peralejosHotel = navPatch.peralejosHotel;
  data.nav.bugarraResort = navPatch.bugarraResort;

  const about = data.aboutUs ?? {};
  const oldProjects = data.projects ?? {};

  data.projects = {
    navAria: data.projects?.navAria ?? 'Resort sections',
    mobileSectionLabel: data.projects?.mobileSectionLabel ?? 'Section',
    sectionPending:
      lang === 'de'
        ? 'Dieser Abschnitt wird in Kürze mit den vom Kunden bereitgestellten Inhalten vervollständigt.'
        : lang === 'fr'
          ? 'Cette section sera complétée prochainement avec le contenu fourni par le client.'
          : lang === 'it'
            ? 'Questa sezione sarà completata a breve con i contenuti forniti dal cliente.'
            : lang === 'pt'
              ? 'Esta secção será concluída em breve com o conteúdo fornecido pelo cliente.'
              : 'このセクションは、クライアントから提供されるコンテンツで近日中に完成します。',
    idea: {
      title: data.nav.idea,
      alt1: 'Terra Infinitus',
      alt2: 'Terra Infinitus',
      alt3: 'Terra Infinitus',
      alt4: 'Terra Infinitus',
      paragraphs: [
        about.p1,
        about.p2,
        about.p3,
        about.p4,
        about.p5,
        about.p6,
        about.p7,
        about.p8,
        about.p9,
        about.p10,
      ].filter(Boolean),
    },
    peralejos: {
      title: navPatch.peralejosHotel,
      description: oldProjects.peralejos?.p1?.slice(0, 180) + '…',
      pdfViewer: oldProjects.peralejos?.pdfViewer ?? 'Peralejos',
      sections: {
        estudioSocioeconomico: {
          title:
            lang === 'de'
              ? 'Sozioökonomische Studie der Region. Abschnitt I'
              : lang === 'fr'
                ? 'Étude socio-économique de la Région. Section I'
                : lang === 'it'
                  ? 'Studio socioeconomico della Regione. Sezione I'
                  : lang === 'pt'
                    ? 'Estudo socioeconómico da Região. Secção I'
                    : '地域の社会経済調査。セクションI',
        },
        introduccion: {
          title:
            lang === 'de'
              ? 'Einleitung'
              : lang === 'fr'
                ? 'Introduction'
                : lang === 'it'
                  ? 'Introduzione'
                  : lang === 'pt'
                    ? 'Introdução'
                    : '紹介',
          paragraphs: [oldProjects.peralejos?.p1, oldProjects.peralejos?.p2, oldProjects.peralejos?.p3].filter(
            Boolean,
          ),
        },
        quienesSomos: {
          title:
            lang === 'de'
              ? 'Wer sind wir? Warum? Das Unternehmen, Synergien'
              : lang === 'fr'
                ? 'Qui sommes-nous ? Pourquoi ? L’entreprise, synergies'
                : lang === 'it'
                  ? 'Chi siamo? Perché? L’azienda, sinergie'
                  : lang === 'pt'
                    ? 'Quem somos? Porquê? A empresa, sinergias'
                    : '私たちについて。なぜ？企業とシナジー',
        },
        conceptosTuristicos: {
          title:
            lang === 'de'
              ? 'Angewandte Tourismuskonzepte, Phasen'
              : lang === 'fr'
                ? 'Concepts touristiques appliqués, phases'
                : lang === 'it'
                  ? 'Concetti turistici applicati, fasi'
                  : lang === 'pt'
                    ? 'Conceitos turísticos aplicados, fases'
                    : '適用される観光概念、フェーズ',
        },
        edificaciones: {
          title:
            lang === 'de'
              ? 'Gebäude, Zimmertypen, Grundrisse'
              : lang === 'fr'
                ? 'Bâtiments, types de chambres, plans'
                : lang === 'it'
                  ? 'Edifici, tipologie di camere, planimetrie'
                  : lang === 'pt'
                    ? 'Edificações, tipos de quartos, plantas'
                    : '建物、客室タイプ、平面図',
        },
        bungalows: { title: 'Bungalows' },
        spasHidroterapia: {
          title:
            lang === 'de'
              ? 'Spas, Pools, Saunen, Fitnessstudios, Hydrotherapie, Terrassen, Bibliothek'
              : lang === 'fr'
                ? 'Spas, piscines, saunas, gymnases, hydrothérapie, terrasses, bibliothèque'
                : lang === 'it'
                  ? 'Spa, piscine, saune, palestre, idroterapia, terrazze, biblioteca'
                  : lang === 'pt'
                    ? 'Spas, piscinas, saunas, ginásios, hidroterapia, terraços, biblioteca'
                    : 'スパ、プール、サウナ、ジム、水治療、テラス、図書館',
        },
        gimnasioRecepcion: {
          title:
            lang === 'de'
              ? 'Fitnessstudio, Rezeption, Besprechungsraum'
              : lang === 'fr'
                ? 'Gymnase, réception, salle de réunion'
                : lang === 'it'
                  ? 'Palestra, reception, sala riunioni'
                  : lang === 'pt'
                    ? 'Ginásio, receção, sala de reuniões'
                    : 'ジム、受付、会議室',
        },
        cocinaCarta: {
          title:
            lang === 'de'
              ? 'Küche, unsere Karte'
              : lang === 'fr'
                ? 'Cuisine, notre carte'
                : lang === 'it'
                  ? 'Cucina, la nostra carta'
                  : lang === 'pt'
                    ? 'Cozinha, a nossa carta'
                    : 'キッチン、メニュー',
        },
        tiendaPaquetes: {
          title:
            lang === 'de'
              ? 'Shop, touristische Pakete'
              : lang === 'fr'
                ? 'Boutique, forfaits touristiques'
                : lang === 'it'
                  ? 'Negozio, pacchetti turistici'
                  : lang === 'pt'
                    ? 'Loja, pacotes turísticos'
                    : 'ショップ、ツアーパッケージ',
        },
        rutasTrekking: {
          title:
            lang === 'de'
              ? 'Trekking- und Laufstrecken, touristische Programme, Analyse, Tourismussituation der Region'
              : lang === 'fr'
                ? 'Itinéraires de trekking et running, programmes touristiques, analyse, situation touristique de la zone'
                : lang === 'it'
                  ? 'Percorsi trekking e running, programmi turistici, analisi, situazione turistica della zona'
                  : lang === 'pt'
                    ? 'Rotas de trekking e running, programas turísticos, análise, situação turística da zona'
                    : 'トレッキング・ランニングルート、観光プログラム、分析、地域の観光状況',
        },
        staffImpacto: {
          title:
            lang === 'de'
              ? 'Personal und Arbeitsplätze, direkte Auswirkung auf die Gemeinschaft'
              : lang === 'fr'
                ? 'Personnel et emplois, impact direct sur la communauté'
                : lang === 'it'
                  ? 'Staff e posti di lavoro, impatto diretto sulla comunità'
                  : lang === 'pt'
                    ? 'Equipa e postos de trabalho, impacto direto na comunidade'
                    : 'スタッフと雇用、地域社会への直接的影響',
        },
      },
    },
    bugarra: {
      title: navPatch.bugarraResort,
      description: oldProjects.bugarra?.p1 ?? '',
      imageAlt: 'Bugarra',
      pdfViewer: oldProjects.bugarra?.pdfViewer ?? 'Bugarra I',
      pdfViewer2: oldProjects.bugarra?.pdfViewer2 ?? 'Bugarra II',
      sections: {
        estudioSocioeconomico: {
          title:
            lang === 'de'
              ? 'Sozioökonomische Studie der Region'
              : lang === 'fr'
                ? 'Étude socio-économique de la Région'
                : lang === 'it'
                  ? 'Studio socioeconomico della Regione'
                  : lang === 'pt'
                    ? 'Estudo socioeconómico da Região'
                    : '地域の社会経済調査',
        },
        elProyecto: {
          title:
            lang === 'de'
              ? 'Das Projekt'
              : lang === 'fr'
                ? 'Le Projet'
                : lang === 'it'
                  ? 'Il Progetto'
                  : lang === 'pt'
                    ? 'O Projeto'
                    : 'プロジェクト',
          paragraphs: [oldProjects.bugarra?.p1, oldProjects.bugarra?.p2].filter(Boolean),
        },
      },
    },
    theLake: {
      title: oldProjects.theLake?.title ?? 'The Lake',
      description: oldProjects.theLake?.p1?.slice(0, 160) + '…',
      imageAlt: 'The Lake',
      pdfViewer: oldProjects.theLake?.pdfViewer ?? 'The Lake',
      sections: {
        historiaPesca: {
          title:
            lang === 'de'
              ? 'Geschichte des Fischens, Fliegenfischen, Sportfischen'
              : lang === 'fr'
                ? 'Histoire de la pêche, pêche à la mouche, pêche sportive'
                : lang === 'it'
                  ? 'Storia della pesca, pesca a mosca, pesca sportiva'
                  : lang === 'pt'
                    ? 'História da pesca, pesca com mosca, pesca desportiva'
                    : '釣りの歴史、フライフィッシング、スポーツフィッシング',
        },
        estadisticas: {
          title:
            lang === 'de' ? 'Statistiken' : lang === 'fr' ? 'Statistiques' : lang === 'it' ? 'Statistiche' : lang === 'pt' ? 'Estatísticas' : '統計',
        },
        tramosIntensivos: {
          title:
            lang === 'de'
              ? 'Intensive Abschnitte'
              : lang === 'fr'
                ? 'Tronçons intensifs'
                : lang === 'it'
                  ? 'Tratti intensivi'
                  : lang === 'pt'
                    ? 'Troços intensivos'
                    : '集約区間',
        },
        nuestroProyecto: {
          title:
            lang === 'de'
              ? 'Unser Projekt'
              : lang === 'fr'
                ? 'Notre Projet'
                : lang === 'it'
                  ? 'Il nostro Progetto'
                  : lang === 'pt'
                    ? 'O nosso Projeto'
                    : '私たちのプロジェクト',
          paragraphs: [oldProjects.theLake?.p1, oldProjects.theLake?.p2].filter(Boolean),
        },
      },
    },
  };

  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Patched ${lang}.json`);
}

for (const lang of LANGS) {
  patchLang(lang);
}
