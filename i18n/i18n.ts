import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import serversFr from '../i18n/fr/servers.json';
import wantedsFr from '../i18n/fr/wanteds.json';

const languages = ["fr"]; // (*)

const resource = {
	fr: {
		servers: serversFr,
		wanteds: wantedsFr,
	},
};

i18n
	.use(LanguageDetector)
	.init({
		detection: {
			order: ["navigator", "path"],
			caches: [] // Désactive le cache temporairement pour les tests
		},
		lng: "fr",
		resources: resource,
		supportedLngs: languages,
		debug: true,
		keySeparator: false,
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false // Ajouter ceci peut aider
		}
	});
export default i18n;