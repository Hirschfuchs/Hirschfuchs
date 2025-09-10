import i18next from "i18next";
import { info } from "./data/info";
import { plannedProjects } from "./data/plannedProjects";
import { topics } from "./data/topics";
import {
  headlineFrom,
  linebreak,
  listFrom,
  stateTextFrom,
  tableFrom,
  topicFrom,
} from "./formatter";
import { TypesPlannedProject } from "./types/typesPlannedProject";

export const generateInfos = () => {
  const lines: string[] = [];

  const infoItems: string[] = [];

  if (info.aboutMe && info.aboutMe.length > 0) {
    const aboutMePoints: string[] = [];
    info.aboutMe.forEach((aboutMeInfo) => {
      aboutMePoints.push(`${i18next.t(aboutMeInfo.name)} ${aboutMeInfo.emoji}`);
    });

    infoItems.push(
      `👨‍💻 **${i18next.t("keywords.aboutMe")}**:\n${listFrom(aboutMePoints, 2)}`,
    );
  }

  if (info.work) {
    if (info.work.url !== undefined) {
      infoItems.push(
        `🔭 I’m currently working at [${i18next.t(info.work.name)}](${info.work.url})`,
      );
    } else {
      infoItems.push(
        `🔭 I’m currently working at ${i18next.t(info.work.name)}`,
      );
    }
  }

  if (info.voluntaryWork && info.voluntaryWork.length > 0) {
    const voluntaryWorkPoints: string[] = [];
    info.voluntaryWork.forEach((voluntaryWork) => {
      if (voluntaryWork.url !== undefined) {
        voluntaryWorkPoints.push(
          `🧭 [${i18next.t(voluntaryWork.name)}](${voluntaryWork.url})`,
        );
      } else {
        voluntaryWorkPoints.push(`🧭 ${i18next.t(voluntaryWork.name)}`);
      }
    });

    infoItems.push(
      `🧑‍💼 **${i18next.t("keywords.voluntaryWork")}**:\n${listFrom(voluntaryWorkPoints, 2)}`,
    );
  }

  if (info.hobbies && info.hobbies.length > 0) {
    const hobbiesPoints: string[] = [];
    info.hobbies.forEach((hobby) => {
      hobbiesPoints.push(`${hobby.emoji} ${i18next.t(hobby.name)}`);
    });

    infoItems.push(
      `🏊 **${i18next.t("keywords.hobbies")}**:\n${listFrom(hobbiesPoints, 2)}`,
    );
  }

  lines.push(
    headlineFrom(`ℹ️ ${i18next.t("headlines.level2.info")}`, { level: 2 }),
    linebreak(),
    listFrom(infoItems),
    linebreak(),
  );

  return lines.join("");
};

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

  lines.push(
    headlineFrom(
      `🆕 ${i18next.t("headlines.level2.newSection", { count: newProjects.length })}`,
      { level: 2 },
    ),
  );

  newProjects.forEach((newProject) => {
    let headlineElements = [`${newProject.emoji} ${newProject.name}`];

    if (newProject.urlRepo !== undefined) {
      headlineElements.push(
        `([${i18next.t("keywords.viewRepo")}](${newProject.urlRepo}))`,
      );
    }
    if (newProject.urlWeb !== undefined) {
      headlineElements.push(
        `--> ([${i18next.t("keywords.showOnline")}](${newProject.urlWeb}))`,
      );
    }

    lines.push(headlineFrom(headlineElements.join(" "), { level: 3 }));
    // Immer wahr, aber von Compiler nicht erkannt
    if (newProject.newFlag) {
      lines.push(
        `*${newProject.description}*\\`,
        `**${newProject.newFlag.newDescription.replaceAll("\n", "**\n**").replaceAll("****", "")}**`,
        "",
      );
    }
  });

  lines.push(linebreak());

  return lines.join("\n");
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
    colText.push(
      ` ([${i18next.t("keywords.showOnline")}](${plannedProject.urlWeb}))`,
    );
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
    headlineFrom(`🚧 ${i18next.t("headlines.level2.plannedProjects")}`, {
      level: 2,
    }),
    linebreak(),
    tableFrom(
      [
        `📦 ${i18next.t("keywords.projects")}`,
        `🎉 ${i18next.t("keywords.state")}`,
        `✔️ ${i18next.t("keywords.buildState")}`,
        `🛎 ${i18next.t("keywords.issuesGithub")}`,
        `📬 ${i18next.t("keywords.pullRequests")}`,
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
    headlineFrom(`📖 ${i18next.t("keywords.details")}`, { level: 3 }),
    listFrom(
      plannedProjects.map(
        (plannedProject) =>
          `${plannedProject.emoji} ${plannedProject.name}: ${plannedProject.description}`,
      ),
    ),
  );

  return lines.join("");
};

export const generateTopics = () => {
  const lines: string[] = [];

  lines.push(
    headlineFrom(`📚 ${i18next.t("headlines.level2.topics")}`, { level: 2 }),
    linebreak(),
    listFrom(topics.map((topic) => topicFrom(topic))),
  );

  return lines.join("");
};
