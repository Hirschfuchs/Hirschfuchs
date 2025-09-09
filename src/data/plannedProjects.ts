import { TypesPlannedProject } from "../types/typesPlannedProject";
import { ProjectStates } from "../enums/projectStates";

export const plannedProjects: TypesPlannedProject[] = [
  {
    name: "Set-Variable for Github Actions",
    description: "Github Action to set repository variables",
    emoji: "#️⃣",
    state: ProjectStates.ACTIVE,
    urlRepo: "https://github.com/OpenFoxes/set-github-variable",
    urlWeb:
      "https://github.com/marketplace/actions/set-github-variable-by-open-foxes",
  },
  {
    name: "Kick-Pages",
    description:
      "Webpages of a local musician. Many technical youthful mistakes -> will be redone.",
    emoji: "🎸",
    state: ProjectStates.ACTIVE,
    urlRepo: "https://github.com/Kick-Projects/kick-fox-alt",
    urlWeb: "https://kick-fox.de",
  },
  {
    name: "KeePass Plugin Collection",
    description:
      "Personal collection of useful KeePass-Plugins, shared with the public. Automated Updates.",
    emoji: "🔏",
    state: ProjectStates.WIP,
    urlRepo: "https://github.com/Hirschfuchs/keepass-plugins",
    newFlag: {
      since: "2025-09-10",
      newDescription:
        "When I noticed while working with my KeePass database that KeePass itself gets updated through my package manager, but the plugins have to be maintained manually, I came up with the idea of moving them into a separate folder. That way, I could use the same plugins across all my devices.\n" +
        "\n" +
        "Well, and then I thought: if I’m doing that anyway, I might as well put the whole thing on GitHub so I can access it from anywhere — and share it with the world in case anyone else might find it useful.\n" +
        "\n" +
        "And that’s when the classic old programmer syndrome kicked in: *“This should really be maintainable with Renovate — if I make the plugins machine-readable and download them automatically.”*\n" +
        "\n" +
        "That’s how this project came to be. Progress is at about 80% now, and I’m pretty happy with how it’s turning out. :)",
    },
  },
  {
    name: "Portfolio",
    description: "Self-Marketing ^^",
    emoji: "📖",
    state: ProjectStates.WIP,
    urlRepo: "https://github.com/Hirschfuchs/portfolio",
    urlWeb: "https://test.bono-fox.de",
  },
  {
    name: "Vim-Cheatsheet (Vimfo)",
    description: "An interactive cheatsheet for VIM-keys",
    emoji: "⌨️",
    state: ProjectStates.PAUSED,
    urlRepo: "https://github.com/OpenFoxes/vim-cheatsheet-interactive",
    urlWeb: "https://vimfo.org",
  },
  {
    name: "TS-Builder",
    description: "Implementation of an dynamic builder pattern in Typescript",
    emoji: "🏗️",
    state: ProjectStates.PAUSED,
    urlRepo: "https://github.com/OpenFoxes/ts-builder",
    urlWeb: "https://www.npmjs.com/package/@openfoxes/ts-builder",
  },
  {
    name: "Notfallapp",
    description:
      "Webapplication for quick access to emergency numbers and relevant information",
    emoji: "🚨",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/Hirschfuchs/Notfallapp",
    urlWeb: "https://notrufe.app/",
  },
  {
    name: "Deutschlandticket Planner",
    description:
      "Calculation of train rides available for the Deutschlandticket and possible to do in a specific time",
    emoji: "🚆",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/deutschlandticket-planner-backend",
  },
  {
    name: "Gitmoji Changelog Generator",
    description:
      "Fork of a changelog generator, but working with Gitmoji instead of keywords",
    emoji: "🤓",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/generate-changelog-gitmoji",
  },
  {
    name: "Wikipedia Poker",
    description:
      "A game, in which the shortest path between two Wikipedia articles should be found (similar to six degrees of wikipedia)",
    emoji: "👣",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/OpenFoxes/wikipedia-poker",
  },
  {
    name: "Stolpersteine Ilmenau",
    description:
      "Overview of the Stopersteine in Ilmenau (Project for remembering the victims of the Holocaust)",
    emoji: "🕎",
    state: ProjectStates.PLANNED,
    urlRepo: "https://github.com/Hirschfuchs/stolpersteine-ilmenau.de",
    urlWeb: "https://stolpersteine-ilmenau.de",
  },
  {
    name: "GameFrame",
    description:
      "A tabletop boardgame simulation in the webbrowser. University-Project, currently not maintained or further developed. Additionally over 300 corresponding JIRA-tickets and all linked resources got deleted.",
    emoji: "🎲",
    state: ProjectStates.INACTIVE,
    urlWeb: "https://game-frame.de",
  },
];
