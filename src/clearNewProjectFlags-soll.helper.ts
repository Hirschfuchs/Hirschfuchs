import { ProjectStates } from "./enums/projectStates";
import { TypesPlannedProject } from "./types/typesPlannedProject";

/**
 * Diese Datei wird ausschließlich im Test genutzt, um die erfolgreiche
 * Funktionsweise von ts-morph sicherzustellen.
 */
export const plannedProjects: TypesPlannedProject[] = [
  {
    name: "Flag auf False",
    description: "Dieses Projekt soll unverändert bleiben",
    emoji: ":)",
    state: ProjectStates.ACTIVE,
    newFlag: false,
  },
  {
    name: "Altes Flag",
    description: "Dieses Projekt soll das Flag entfernen",
    emoji: ":)",
    state: ProjectStates.ACTIVE,
    newFlag: false,
  },
  {
    name: "Kein Flag",
    description: "Dieses Projekt soll unverändert bleiben",
    emoji: ":)",
    state: ProjectStates.WIP,
  },
];
