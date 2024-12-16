import {
  generateConnectWithMe,
  generateHeader,
  generateLanguagesAndTools,
  generateStats,
} from "./staticContents";
import {
  generateInfos,
  generatePlannedProjects,
  generateTopics,
} from "./dynamicContents";
import { horizontalLine, linebreak } from "./formatter";
import * as fs from "fs";
import i18next, { TFunction } from "i18next";
import { i18nResources } from "./i18n/i18n";

const generateReadme = (translation: TFunction<"translation">) => {
  const readmeSections: string[] = [
    generateHeader(),
    linebreak(),
    generateInfos(),
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

  fs.writeFile("./readme.md", readmeSections.join(""), (err) => {
    if (err !== null) {
      console.error("Fehler beim Generieren der Readme-Datei!", err);
    }
  });
};

i18next.init(
  {
    lng: "en",
    resources: i18nResources,
  },
  (err, translation) => {
    if (err !== null) {
      throw Error(err);
    }

    generateReadme(translation);
  },
);
