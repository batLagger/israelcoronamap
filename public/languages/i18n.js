let translation = He;

const setLanguage = selectedLanguage => {
  localStorage.setItem('language', selectedLanguage);
};

const setTranslation = language => {
  if (language === 'He') {
    translation = He;
  } else if (language === 'Ar') {
    translation = Ar;
  } else if (language === 'Ru') {
    translation = Ru;
  } else {
    translation = En;
  }
};

const i18n = text => {
  if (translation.hasOwnProperty(text)) {
    return translation[text];
  } else {
    return text;
  }
};

const getDirection = () => {
  const language = localStorage.getItem('language');
  if (language === 'He' || language === 'Ar') {
    return 'rtl';
  } else {
    return 'ltr';
  }
};

const setTranslationInHTML = () => {
  setTranslationByID('last-updated-text', 'lastUpdatedIn');
  setTranslationByID('magen-david-adom', 'magenDavidAdom');
  setTranslationByID('health-ministry', 'healthMinistry');
  setTranslationByID('magen-david-adom-mobile', 'magenDavidAdom');
  setTranslationByID('health-ministry-mobile', 'healthMinistry');
  setTranslationByID('search-for-flights', 'searchForFlights');
  setTranslationByID('embed-code', 'embedCodes');
  setTranslationByID('about', 'about');
  setTranslationByID('contact-use', 'contactUse');
  setTranslationByID('sick-update-title', 'sickUpdateTitle');
  setTranslationByID('number-of-sick-people', 'numberOfSickPeople');
  setTranslationByID('number-of-recovered-people', 'numberOfRecoveredPeople');
  setTranslationByID('number-of-deaths', 'numberOfDeaths');
  setTranslationByID(
    'number-of-people-in-quarantine',
    'numberOfPeopleInQuarantine'
  );
  setTranslationByID('last-updated-title-sick', 'lastUpdatedIn');
  setTranslationByID('select-language', 'selectLanguage');
  setTranslationByID('select-language-header', 'selectLanguage');
  setTranslationByID('state-of-patients-israel', 'stateOfPatientsInIsrael');
  setPlaceholderTranslationByID('search-track-input-dekstop', 'trackPlaceholder');
  setTranslationByID('track-start-time', 'trackStart');
  setTranslationByID('track-end-time', 'trackEnd');
  setMapReader();
};

const setTranslationByID = (id, text) => {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = i18n(text);
  }
};

const setPlaceholderTranslationByID = (id, text) => {
  const el = $("#" + id);
  if (el) {
    el.attr("placeholder", i18n(text));
  }
};

const addClassByID = (id, className) => {
  const el = document.getElementById(id);
  el.classList.add(className);
};

const getLanguage = () => {
  const lang = localStorage.getItem('language');
  return lang ? lang : 'He';
};


const setMapReader = () => {
  const language = localStorage.getItem('language');
  let mapReaderContainer = document.getElementById('map-reader');
  if (!mapReaderContainer) return;

  mapReaderContainer.innerHTML = `
  <img alt="map-reader" src="assets/images/map-icons/mapReader${language}.svg" class="map-reader-img" width="350" />
  `;
};

const initTranslation = () => {
  let language = 'He';
  if (window.location.pathname.includes('embed')) {
    setTranslation(language);
    setTranslationInHTML();
    return;
  }

  const queryParamLanguage = getQueryParam('language');
  if (queryParamLanguage) {
    language = queryParamLanguage;
  } else {
    const LSLanguage = localStorage.getItem('language');
    if (LSLanguage) {
      language = LSLanguage;
      let params = `/?language=${language}`;
      const id = parseInt(getQueryParam('id'));
      if (id) {
        params += `&id=${id}`;
      }
      window.history.pushState('Corona map', 'Corona map', params);
    }
  }
  console.log('language', language);

  localStorage.setItem('language', language);
  setTranslation(language);
  setTranslationInHTML();
};
