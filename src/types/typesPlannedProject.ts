import { ProjectStates } from "../enums/projectStates";

export type TypesPlannedProject = {
  name: string;
  description: string;
  emoji: string;
  urlRepo?: string;
  urlWeb?: string;
  state: ProjectStates;
  /**
   * Wenn gesetzt, kann ein Element zu einem bestimmten Zeitpunkt als neu gekennzeichnet werden.
   * Neue Elemente werden auf der Startseite hervorgehoben.
   * Nach einer Weile werden sie automatisch als nicht mehr neu gekennzeichnet.
   */
  newFlag?:
    | false
    | {
        since: `${string}-${string}-${string}`;
        newDescription: string;
      };
  overrides?: {
    project?: string;
    buildState?: string;
    issues?: string;
    prs?: string;
  };
};
