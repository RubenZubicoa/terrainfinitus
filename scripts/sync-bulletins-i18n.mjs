import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LANGS = ['de', 'fr', 'it', 'pt', 'jp'];
const es = JSON.parse(readFileSync(join(ROOT, 'public', 'i18n', 'es.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(ROOT, 'public', 'i18n', 'en.json'), 'utf8'));

const BULLETINS = {
  de: {
    ...en.bulletins,
    title: 'Newsletter',
    subscribeCta: 'Um unsere Newsletter zu erhalten, klicken Sie hier',
    thanks: 'Danke.',
    archiveTitle: 'Veröffentlichte Newsletter',
    viewIssue: 'Newsletter ansehen',
    unsubscribeHint: 'Wenn Sie bereits abonniert sind und unsere Newsletter nicht mehr erhalten möchten,',
    unsubscribeLink: 'klicken Sie hier, um Ihr Abonnement zu kündigen',
    subscribeDialog: {
      ...en.bulletins.subscribeDialog,
      title: 'Newsletter-Abonnement',
      description:
        'Geben Sie Ihre Daten ein, um unsere Newsletter zu erhalten. Nur Name und E-Mail sind Pflichtfelder.',
      name: 'Name',
      email: 'E-Mail-Adresse',
      required: '(Pflichtfeld)',
      optionalLegend: 'Zusätzliche Angaben (freiwillig)',
      phone: 'Telefon',
      address: 'Adresse',
      notes: 'Weitere Angaben',
      privacy:
        'Ihre Daten bleiben absolut privat und werden nicht an Dritte weitergegeben.',
      submit: 'Abonnieren',
      submitting: 'Wird gesendet…',
      success:
        'Vielen Dank. Ihr Abonnement wurde registriert. Sie erhalten bald unsere Newsletter.',
    },
    unsubscribePage: {
      ...en.bulletins.unsubscribePage,
      title: 'Abonnement kündigen',
      description:
        'Geben Sie Ihre E-Mail-Adresse ein und wir entfernen sie aus unserer Newsletter-Liste.',
      email: 'E-Mail-Adresse',
      submit: 'Abmelden',
      submitting: 'Wird verarbeitet…',
      success:
        'Wir haben Ihre Anfrage erhalten. Ihre E-Mail-Adresse wird aus unserer Newsletter-Liste entfernt.',
      back: 'Zurück zu Newsletter',
    },
    issues: { boletin1: { title: 'Newsletter Nr. 1' } },
  },
  fr: {
    ...en.bulletins,
    title: 'Bulletins',
    subscribeCta: 'Pour recevoir nos bulletins, cliquez ici',
    thanks: 'Merci.',
    archiveTitle: 'Bulletins publiés',
    viewIssue: 'Voir le bulletin',
    unsubscribeHint: 'Si vous êtes déjà abonné et souhaitez ne plus recevoir nos bulletins,',
    unsubscribeLink: 'cliquez ici pour annuler votre abonnement',
    subscribeDialog: {
      ...en.bulletins.subscribeDialog,
      title: 'Abonnement aux bulletins',
      description:
        'Saisissez vos coordonnées pour recevoir nos bulletins. Seuls le nom et l’e-mail sont obligatoires.',
      name: 'Nom',
      email: 'Adresse e-mail',
      required: '(obligatoire)',
      optionalLegend: 'Informations supplémentaires (facultatives)',
      phone: 'Téléphone',
      address: 'Adresse',
      notes: 'Autres informations',
      privacy:
        'Vos données resteront absolument privées et ne seront pas partagées avec des tiers.',
      submit: 'S’abonner',
      submitting: 'Envoi en cours…',
      success:
        'Merci. Votre abonnement a été enregistré. Vous recevrez bientôt nos bulletins.',
    },
    unsubscribePage: {
      ...en.bulletins.unsubscribePage,
      title: 'Annuler l’abonnement',
      description:
        'Saisissez votre adresse e-mail et nous la supprimerons de notre liste de bulletins.',
      email: 'Adresse e-mail',
      submit: 'Se désabonner',
      submitting: 'Traitement…',
      success:
        'Nous avons reçu votre demande. Votre adresse e-mail sera supprimée de notre liste.',
      back: 'Retour aux bulletins',
    },
    issues: { boletin1: { title: 'Bulletin nº 1' } },
  },
  it: {
    ...en.bulletins,
    title: 'Bollettini',
    subscribeCta: 'Per ricevere i nostri bollettini, clicca qui',
    thanks: 'Grazie.',
    archiveTitle: 'Bollettini pubblicati',
    viewIssue: 'Vedi bollettino',
    unsubscribeHint: 'Se sei già iscritto e desideri smettere di ricevere i nostri bollettini,',
    unsubscribeLink: 'clicca qui per annullare l’iscrizione',
    subscribeDialog: {
      ...en.bulletins.subscribeDialog,
      title: 'Iscrizione ai bollettini',
      description:
        'Inserisci i tuoi dati per ricevere i nostri bollettini. Solo nome ed e-mail sono obbligatori.',
      name: 'Nome',
      email: 'Indirizzo e-mail',
      required: '(obbligatorio)',
      optionalLegend: 'Dati aggiuntivi (facoltativi)',
      phone: 'Telefono',
      address: 'Indirizzo',
      notes: 'Altri dati',
      privacy:
        'I tuoi dati rimarranno assolutamente privati e non saranno condivisi con terzi.',
      submit: 'Iscriviti',
      submitting: 'Invio in corso…',
      success:
        'Grazie. La tua iscrizione è stata registrata. Presto riceverai i nostri bollettini.',
    },
    unsubscribePage: {
      ...en.bulletins.unsubscribePage,
      title: 'Annulla iscrizione',
      description:
        'Inserisci il tuo indirizzo e-mail e lo rimuoveremo dalla nostra lista di bollettini.',
      email: 'Indirizzo e-mail',
      submit: 'Annulla iscrizione',
      submitting: 'Elaborazione…',
      success:
        'Abbiamo ricevuto la tua richiesta. Il tuo indirizzo e-mail sarà rimosso dalla nostra lista.',
      back: 'Torna ai bollettini',
    },
    issues: { boletin1: { title: 'Bollettino n. 1' } },
  },
  pt: {
    ...es.bulletins,
    title: 'Boletins',
    subscribeCta: 'Para receber os boletins, clique aqui',
    thanks: 'Obrigado.',
    archiveTitle: 'Boletins publicados',
    viewIssue: 'Ver boletim',
    unsubscribeHint: 'Se já está subscrito e deseja deixar de receber os nossos boletins,',
    unsubscribeLink: 'clique aqui para anular a sua subscrição',
    subscribeDialog: {
      ...es.bulletins.subscribeDialog,
      submit: 'Subscrever',
      submitting: 'A enviar…',
      success:
        'Obrigado. A sua subscrição foi registada. Em breve receberá os nossos boletins.',
    },
    unsubscribePage: {
      ...es.bulletins.unsubscribePage,
      title: 'Anular subscrição',
      submit: 'Cancelar subscrição',
      submitting: 'A processar…',
      success:
        'Recebemos o seu pedido. O seu endereço de e-mail será removido da nossa lista de boletins.',
      back: 'Voltar aos boletins',
    },
    issues: { boletin1: { title: 'Boletim n.º 1' } },
  },
  jp: {
    ...en.bulletins,
    title: 'ニュースレター',
    subscribeCta: 'ニュースレターを受け取るにはこちらをクリック',
    thanks: 'ありがとうございます。',
    archiveTitle: '公開済みニュースレター',
    viewIssue: 'ニュースレターを見る',
    unsubscribeHint: 'すでに登録済みでニュースレターの受信を停止したい場合は、',
    unsubscribeLink: 'こちらをクリックして登録を解除してください',
    issues: { boletin1: { title: 'ニュースレター第1号' } },
  },
};

for (const lang of LANGS) {
  const file = join(ROOT, 'public', 'i18n', `${lang}.json`);
  const data = JSON.parse(readFileSync(file, 'utf8'));
  data.bulletins = BULLETINS[lang];
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Patched bulletins in ${lang}.json`);
}
