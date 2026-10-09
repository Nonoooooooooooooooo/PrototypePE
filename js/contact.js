/* =========================================
   CONTACT — REVAL'0'RESTO
   Questionnaire et génération du message
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
  const questionnaire = document.querySelector('.quote-form');

  // Ne fait rien si cette page n'est pas présente.
  if (!questionnaire) return;

  const generateButton = document.getElementById('generate-message');
  const copyButton = document.getElementById('copy-message');
  const resultSection = document.getElementById('resultat-message');
  const messageField = document.getElementById('message-genere');
  const openEmailLink = document.getElementById('open-email');
  const formStatus = document.getElementById('form-status');
  const copyStatus = document.getElementById('copy-status');

  const wasteError = document.getElementById('waste-error');
  const needsError = document.getElementById('needs-error');

  const emailRecipient = 'devisrevaloresto@gmail.com';
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Récupère la valeur d'un champ.
  function getValue(id) {
    const field = document.getElementById(id);
    return field ? field.value.trim() : '';
  }

  // Récupère les choix cochés d'un groupe de cases.
  function getCheckedValues(name) {
    return Array.from(
      questionnaire.querySelectorAll(
        'input[name="' + name + '"]:checked'
      )
    ).map(function (input) {
      return input.value;
    });
  }

  // Récupère la réponse d'un groupe de boutons radio.
  function getRadioValue(name) {
    const selected = questionnaire.querySelector(
      'input[name="' + name + '"]:checked'
    );

    return selected ? selected.value : '';
  }

  // Affiche ou masque les messages d'erreur des questions à choix multiples.
  function updateGroupError(name, errorElement) {
    const hasSelection = getCheckedValues(name).length > 0;

    if (errorElement) {
      errorElement.hidden = hasSelection;
    }

    return hasSelection;
  }

  // Masque l'erreur dès qu'une réponse est sélectionnée.
  questionnaire
    .querySelectorAll('input[name="dechets"]')
    .forEach(function (input) {
      input.addEventListener('change', function () {
        updateGroupError('dechets', wasteError);
      });
    });

  questionnaire
    .querySelectorAll('input[name="besoins"]')
    .forEach(function (input) {
      input.addEventListener('change', function () {
        updateGroupError('besoins', needsError);
      });
    });

  // Construit une liste lisible à partir des réponses sélectionnées.
  function formatList(values) {
    if (values.length === 0) {
      return 'Non renseigné';
    }

    return values.map(function (value) {
      return '• ' + value;
    }).join('\n');
  }

  // Vérifie le questionnaire avant de créer le message.
  function validateQuestionnaire() {
    const hasWaste = updateGroupError('dechets', wasteError);
    const hasNeeds = updateGroupError('besoins', needsError);

    if (!hasWaste || !hasNeeds) {
      formStatus.textContent =
        'Merci de répondre aux deux questions signalées avant de continuer.';

      const firstMissingGroup = !hasWaste ? 'dechets' : 'besoins';
      const firstInput = questionnaire.querySelector(
        'input[name="' + firstMissingGroup + '"]'
      );

      const firstError = !hasWaste ? wasteError : needsError;

      if (firstError) {
        firstError.hidden = false;
        firstError.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'center'
        });
      }

      if (firstInput) {
        firstInput.focus({ preventScroll: true });
      }

      return false;
    }

    // Vérifie les champs obligatoires et le format de l'adresse e-mail.
    if (!questionnaire.checkValidity()) {
      questionnaire.reportValidity();
      formStatus.textContent =
        'Vérifiez les champs obligatoires avant de générer votre message.';
      return false;
    }

    formStatus.textContent = '';
    return true;
  }

  // Génère le message final à partir des réponses.
  function buildMessage() {
    const restaurant = getValue('restaurant');
    const type = getValue('type-etablissement');
    const ville = getValue('ville');
    const codePostal = getValue('code-postal');
    const nombreSites = getValue('nombre-sites');
    const couverts = getValue('couverts');

    const dechets = getCheckedValues('dechets');
    const organisation = getRadioValue('organisation-tri');
    const partenaires = getRadioValue('partenaires');
    const besoins = getCheckedValues('besoins');

    const nom = getValue('nom-contact');
    const fonction = getValue('fonction');
    const email = getValue('email-contact');
    const telephone = getValue('telephone');
    const remarques = getValue('remarques');

    const lines = [
      'Objet : Demande d’accompagnement — ' + restaurant,
      '',
      'Bonjour Reval’0’Resto,',
      '',
      'Je vous contacte afin d’étudier les solutions de tri et de valorisation',
      'adaptées à mon établissement.',
      '',
      '1. MON ÉTABLISSEMENT',
      'Nom : ' + restaurant,
      'Type : ' + type,
      'Ville : ' + ville,
      'Code postal : ' + codePostal,
      'Nombre d’établissements : ' + (nombreSites || 'Non renseigné'),
      'Nombre moyen de couverts par jour : ' + (couverts || 'Non renseigné'),
      '',
      '2. TYPES DE DÉCHETS',
      formatList(dechets),
      '',
      '3. ORGANISATION ACTUELLE',
      'Organisation du tri : ' + organisation,
      'Partenaires actuels : ' + partenaires,
      '',
      '4. MES BESOINS',
      formatList(besoins),
      '',
      '5. MES COORDONNÉES',
      'Nom : ' + nom,
      'Fonction : ' + (fonction || 'Non renseignée'),
      'E-mail : ' + email,
      'Téléphone : ' + (telephone || 'Non renseigné'),
      '',
      '6. INFORMATIONS COMPLÉMENTAIRES',
      remarques || 'Aucune précision supplémentaire.',
      '',
      'Je souhaiterais être recontacté(e) afin d’échanger sur ma situation',
      'et sur les solutions qui pourraient convenir à mon établissement.',
      '',
      'Merci par avance pour votre retour.',
      '',
      'Cordialement,',
      nom,
      '',
      '---',
      'Demande préparée sur le site Reval’0’Resto.'
    ];

    return lines.join('\n');
  }

  // Prépare le lien vers l'application de messagerie.
  // Ce lien ouvre un brouillon : il n'envoie pas l'e-mail.
  function updateEmailLink() {
     if (!openEmailLink || !messageField) return;

        const restaurant = getValue('restaurant');
        const subject = 'Demande d’accompagnement - ' + restaurant;
        const body = messageField.value;

  openEmailLink.href =
    'mailto:' + emailRecipient +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
  }


  // Génération du message.
  generateButton.addEventListener('click', function () {
    if (!validateQuestionnaire()) return;

    messageField.value = buildMessage();
    updateEmailLink();

    resultSection.hidden = false;
    formStatus.textContent =
      'Votre message a été généré. Vous pouvez maintenant le relire et le copier.';

    resultSection.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start'
    });

    // Place le curseur dans le texte généré pour faciliter la relecture.
    messageField.focus({ preventScroll: true });
  });

  // Si le restaurateur modifie le texte, actualise le brouillon d'e-mail.
  messageField.addEventListener('input', updateEmailLink);

  // Copie le message. Utilise une solution de secours si Clipboard API indisponible.
  async function copyMessage() {
    const text = messageField.value;

    if (!text.trim()) {
      copyStatus.textContent = 'Générez d’abord votre message.';
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        messageField.focus();
        messageField.select();

        const copied = document.execCommand('copy');

        if (!copied) {
          throw new Error('La copie automatique a échoué.');
        }

        messageField.setSelectionRange(0, 0);
      }

      copyStatus.textContent =
        'Message copié ! Vous pouvez le coller dans votre e-mail.';
    } catch (error) {
      messageField.focus();
      messageField.select();

      copyStatus.textContent =
        'La copie automatique n’a pas fonctionné. Sélectionnez le texte puis copiez-le manuellement.';
    }
  }

  copyButton.addEventListener('click', copyMessage);
});
