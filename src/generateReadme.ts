import * as fs from "fs";
import i18next from "i18next";
import {
  generateInfos,
  generateNewProjectsHighlight,
  generatePlannedProjects,
  generateTopics,
} from "./dynamicContents";
import { horizontalLine, linebreak } from "./formatter";
import {
  generateConnectWithMe,
  generateHeader,
  generateLanguagesAndTools,
  generateStats,
} from "./staticContents";

export const generateReadme = async (language?: string) => {
  await i18next.changeLanguage(language ?? "en");
  console.log(`Erzeuge Readme in ${i18next.t("langName")}...`);

  const readmeSections: string[] = [
    await generateHeader(),
    linebreak(),
    generateInfos(),
    generateNewProjectsHighlight(),
    generatePlannedProjects(),
    generateTopics(),
    horizontalLine(2),
    generateConnectWithMe(),
    horizontalLine(2),
    generateLanguagesAndTools(),
    linebreak(),
    horizontalLine(2),
    generateStats(),
  ];

  let filename = "readme.md";

  if (language !== undefined) {
    filename = `readme.${language}.md`;
  }

  fs.writeFile(`./${filename}`, readmeSections.join(""), (err) => {
    if (err !== null) {
      console.error("Fehler beim Generieren der Readme-Datei!", err);
    }
  });

  console.log(
    `Readme (${i18next.language}) erfolgreich in ${filename} generiert.`,
  );
};
