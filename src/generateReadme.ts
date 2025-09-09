import {
  generateConnectWithMe,
  generateHeader,
  generateLanguagesAndTools,
  generateStats,
} from "./staticContents";
import {
  generateInfos,
  generateNewProjectsHighlight,
  generatePlannedProjects,
  generateTopics,
} from "./dynamicContents";
import { horizontalLine, linebreak } from "./formatter";
import * as fs from "fs";

const generateReadme = () => {
  const readmeSections: string[] = [
    generateHeader(),
    linebreak(),
    generateNewProjectsHighlight(),
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

generateReadme();
