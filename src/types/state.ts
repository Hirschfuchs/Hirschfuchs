import i18next from "i18next";
import { ProjectStates } from "../enums/projectStates";

export type ProjectState = {
  icon: string;
  name: string;
};

export const stateDescription = (state: ProjectStates): ProjectState => {
  switch (state) {
    case ProjectStates.ACTIVE:
      return { icon: "🏃", name: i18next.t("states.active") };
    case ProjectStates.INACTIVE:
      return { icon: "💤", name: i18next.t("states.inactive") };
    case ProjectStates.PLANNED:
      return { icon: "📃", name: i18next.t("states.planned") };
    case ProjectStates.WIP:
      return { icon: "🚧", name: i18next.t("states.wip") };
    case ProjectStates.PAUSED:
      return { icon: "⏸️", name: i18next.t("states.paused") };
  }
};
