import { TypesPlannedProject } from "../types/typesPlannedProject";
import { ProjectStates } from "../enums/projectStates";

export const plannedProjects: TypesPlannedProject[] = [
  {
    name: "Portfolio",
    description: "Self-Marketing ^^",
    state: ProjectStates.WIP,
    urlRepo: "https://github.com/Hirschfuchs/portfolio",
    urlWeb: "https://test.bono-fox.de",
  },
  {
    name: "Set-Variable for Github Actions",
    description: "Github Action to set repository variables",
    state: ProjectStates.ACTIVE,
    urlRepo: "https://github.com/OpenFoxes/set-github-variable",
    urlWeb: "https://github.com/marketplace/actions/set-github-variable-by-open-foxes",
  },
  {
    name: "Vim-Cheatsheet (Vimfo)",
    description: "An interactive cheatsheet for VIM-keys",
    state: ProjectStates.WIP,
    urlRepo: "https://github.com/OpenFoxes/vim-cheatsheet-interactive",
    urlWeb: "https://vimfo.org",
  },
  {
    name: "GameFrame",
    description:
      "A tabletop boardgame simulation in the webbrowser. University-Project, currently not maintained or further developed. Additionally over 300 corresponding JIRA-tickets and all linked resources got deleted.",
    state: ProjectStates.INACTIVE,
    urlWeb: "https://game-frame.de",
  },
  {
    name: "Kick-Pages",
    description:
      "Webpages of a local musician. Many technical youthful mistakes -> will be redone.",
    state: ProjectStates.ACTIVE,
    urlRepo: "https://github.com/Kick-Projects/kick-fox-alt",
    urlWeb: "https://kick-fox.de",
  },
  {
    name: "Notfallapp",
    description:
      "Webapplication for quick access to emergency numbers and relevant information",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/Hirschfuchs/Notfallapp",
    urlWeb: "https://notrufe.app/",
  },
  {
    name: "Gitmoji Changelog Generator",
    description:
      "Fork of a changelog generator, but working with Gitmoji instead of keywords",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/generate-changelog-gitmoji",
  },
  {
    name: "Deutschlandticket Planner",
    description:
      "Calculation of train rides available for the Deutschlandticket and possible to do in a specific time",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/deutschlandticket-planner",
  },
  {
    name: "Wikipedia Poker",
    description:
      "A game, in which the shortest path between two Wikipedia articles should be found (similar to six degrees of wikipedia)",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/wikipedia-poker",
  },
  {
    name: "Stolpersteine Ilmenau",
    description:
      "Overview of the Stopersteine in Ilmenau (Project for remembering the victims of the Holocaust)",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/Hirschfuchs/stolpersteine-ilmenau.de",
    urlWeb: "https://stolpersteine-ilmenau.de",
  },
];
