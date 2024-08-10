import { ProjectStates } from "../enums/projectStates";

export type ProjectState = {
  icon: string;
  name: string;
};

export const stateDescription = (state: ProjectStates): ProjectState => {
  switch (state) {
    case ProjectStates.ACTIVE:
      return { icon: "🏃", name: "Actice" };
    case ProjectStates.INACTIVE:
      return { icon: "💤", name: "Inactive" };
    case ProjectStates.PLANNED:
      return { icon: "📃", name: "Planned" };
    case ProjectStates.WIP:
      return { icon: "🚧", name: "Work in Progress" };
  }
};
