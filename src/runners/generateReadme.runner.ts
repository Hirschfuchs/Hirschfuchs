import { availableLanguages } from "../data/availableLanguages";
import { generateReadme } from "../generateReadme";
import { initI18N } from "../initI18n";

const readmeVersions = [
  undefined,
  ...availableLanguages
    .map((availableLanguage) => availableLanguage.language)
    .filter((language) => language !== "en"),
];

initI18N().then(async () => {
  for (let language of readmeVersions) {
    await generateReadme(language);
  }
});
