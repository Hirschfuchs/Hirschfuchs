import { ProjectStates } from "../enums/projectStates";

export type TypesPlannedProject = {
  name: string;
  description: string;
  urlRepo?: string;
  urlWeb?: string;
  state: ProjectStates;
  overrides?: {
    project?: string;
    buildState?: string;
    issues?: string;
    prs?: string;
  };
};
