import {
  headlineFrom,
  linebreak,
  listFrom,
  stateTextFrom,
  tableFrom,
  topicFrom,
} from "./formatter";
import { info } from "./data/info";
import { plannedProjects } from "./data/plannedProjects";
import { TypesPlannedProject } from "./types/typesPlannedProject";
import { ProjectStates } from "./enums/projectStates";
import { topics } from "./data/topics";

export const generateNewProjectsHighlight = () => {
  const lines: string[] = [];

  const newProjects: ReadonlyArray<TypesPlannedProject> = plannedProjects
    .filter((project) => project.newFlag)
    .sort((a, b) => {
      if (a.newFlag && b.newFlag) {
        if (new Date(a.newFlag.since) < new Date(b.newFlag.since)) {
          return 1;
        }
        if (new Date(a.newFlag.since) > new Date(b.newFlag.since)) {
          return -1;
        }
      }
      return 0;
    });

  if (newProjects.length === 0) {
    return "";
  }

  if (newProjects.length === 1) {
    lines.push(headlineFrom("Neues Projekt", { level: 2 }));
  } else {
    lines.push(headlineFrom("Neue Projekte", { level: 2 }));
  }

  newProjects.forEach((newProject) => {
    lines.push(headlineFrom(newProject.name, { level: 3 }));
    // Immer wahr, aber von Compiler nicht erkannt
    if (newProject.newFlag) {
      lines.push(
        `*${newProject.description}*\\`,
        `**${newProject.newFlag.newDescription}**`,
        "",
      );
    }
  });

  lines.push(linebreak());

  return lines.join("\n");
};

export const generateInfos = () => {
  const lines: string[] = [];

  const infoItems: string[] = [];

  if (info.work !== undefined) {
    if (info.work.url !== undefined) {
      infoItems.push(
        `🔭 I’m currently working at [${info.work.name}](${info.work.url})`,
      );
    } else {
      infoItems.push(`🔭 I’m currently working at ${info.work.name}`);
    }
  }

  lines.push(
    headlineFrom("Infos", { level: 2 }),
    linebreak(),
    listFrom(infoItems),
    linebreak(),
  );

  return lines.join("");
};

const plannedProjectNameCol = (plannedProject: TypesPlannedProject) => {
  let colText: string[] = [];
  let projectName;

  if (plannedProject.newFlag) {
    projectName = `🆕 ${plannedProject.name}`;
  } else {
    projectName = plannedProject.name;
  }

  if (plannedProject.urlRepo !== undefined) {
    colText.push(`[${projectName}](${plannedProject.urlRepo})`);
  } else {
    colText.push(projectName);
  }

  if (plannedProject.urlWeb !== undefined) {
    colText.push(` ([Online ansehen](${plannedProject.urlWeb}))`);
  }

  return colText.join("");
};

const plannedProjectBuildStateCol = (plannedProject: TypesPlannedProject) => {
  if (plannedProject.urlWeb !== undefined) {
    let colText: string[] = [];

    colText.push(
      `<img alt="State" src="https://img.shields.io/website?down_color=red&down_message=offline&up_color=blue&up_message=online&url=${encodeURI(plannedProject.urlWeb)}"/>`,
      `<img alt="Security (Headers)" src="https://img.shields.io/mozilla-observatory/grade/${new URL(plannedProject.urlWeb).host}?label=h-security&logo=mozilla&publish"/>`,
    );

    return colText.join(" ");
  } else {
    return `<img alt="State" src="https://img.shields.io/badge/website-${encodeURI("No website yet")}-orange" />`;
  }
};

const plannedProjectIssuesCol = (plannedProject: TypesPlannedProject) => {
  if (plannedProject.urlRepo?.startsWith("https://github.com/")) {
    return `<img alt="Issues" src="https://img.shields.io/github/issues/${plannedProject.urlRepo.substring(19)}?style=flat-square"/>`;
  }

  return "";
};

const plannedProjectPrsCol = (plannedProject: TypesPlannedProject) => {
  if (plannedProject.urlRepo?.startsWith("https://github.com/")) {
    return `<img alt="Pull Requests" src="https://img.shields.io/github/issues-pr/${plannedProject.urlRepo.substring(19)}?style=flat-square"/>`;
  }

  return "";
};

export const generatePlannedProjects = () => {
  const lines: string[] = [];

  lines.push(
    headlineFrom("Planned Projects", { level: 2 }),
    linebreak(),
    tableFrom(
      [
        "📦 Projects",
        "🎉 State",
        "✔️ Build State",
        "🛎 Issues",
        "📬 Pull requests",
      ],
      plannedProjects.map((plannedProject): string[] => [
        plannedProjectNameCol(plannedProject),
        stateTextFrom(plannedProject.state),
        plannedProjectBuildStateCol(plannedProject),
        plannedProjectIssuesCol(plannedProject),
        plannedProjectPrsCol(plannedProject),
      ]),
    ),
    linebreak(),
    headlineFrom("📖 Details", { level: 3 }),
    listFrom(
      plannedProjects.map(
        (plannedProject) =>
          `${plannedProject.name}: ${plannedProject.description}`,
      ),
    ),
  );

  return lines.join("");
};

export const generateTopics = () => {
  const lines: string[] = [];

  lines.push(
    headlineFrom("Topics", { level: 2 }),
    linebreak(),
    listFrom(topics.map((topic) => topicFrom(topic))),
  );

  return lines.join("");
};
