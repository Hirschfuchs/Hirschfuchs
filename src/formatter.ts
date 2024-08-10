import { ProjectStates } from "./enums/projectStates";
import { stateDescription } from "./types/state";
import { Topic } from "./types/typesTopics";
import { TopicTypes } from "./enums/TopicTypes";

export type HeadlineConfiguration = {
  level?: number;
  alignment?: string;
};
export const headlineFrom = (
  text: string,
  configuration?: HeadlineConfiguration,
) => {
  const headlineString: string[] = [];

  if (configuration?.alignment !== undefined) {
    headlineString.push(
      `<h${configuration.level ?? 1} align="${configuration.alignment}">`,
    );
  } else {
    headlineString.push("#".repeat(configuration?.level ?? 1), " ");
  }

  headlineString.push(text);

  if (configuration?.alignment !== undefined) {
    headlineString.push(`</h${configuration?.level ?? 1}>`);
  }

  headlineString.push("\n");

  return headlineString.join("");
};

export type ParagraphConfiguration = {
  alignment?: string;
};
export const paragraphFrom = (
  text: string,
  configuration?: ParagraphConfiguration,
) => {
  const paragraphString: string[] = [];

  paragraphString.push(`<p`);
  if (configuration?.alignment !== undefined) {
    paragraphString.push(` align="${configuration.alignment}"`);
  }
  paragraphString.push(">");

  paragraphString.push(text);

  paragraphString.push("</p>");
  paragraphString.push("\n");

  return paragraphString.join("");
};

export const listFrom = (listpoints: string[]) => {
  return listpoints
    .map((listpoint) => `- ${listpoint}`)
    .join("\n")
    .concat("\n");
};

const tableRowFrom = (rowValues: string[]) => {
  return `|${rowValues.join("|")}|`;
};
export const tableFrom = (headlines: string[], rowValues: string[][]) => {
  const rows: string[] = [];

  rows.push(tableRowFrom(headlines));
  rows.push(tableRowFrom(headlines.map((column) => "------")));
  rowValues.forEach((rowValue) => rows.push(tableRowFrom(rowValue)));

  return rows.join("\n").concat("\n");
};

export const stateTextFrom = (state: ProjectStates) => {
  const description = stateDescription(state);
  return `${description.icon} ${description.name}`;
};

export const topicFrom = (topic: Topic) => {
  switch (topic.type) {
    case TopicTypes.LEARNING:
      return `🌱 I’m currently learning **${topic.keyword}**`;
  }
};

export const linebreak = () => "\n";

export const horizontalLine = (numberOfLines?: number) => {
  const lines: string[] = [];

  if (numberOfLines === undefined) {
    numberOfLines = 1;
  }

  for (let lineNr = 0; lineNr < numberOfLines; lineNr++) {
    lines.push("---");
  }

  return `\n${lines.join("\n\n")}\n\n`;
};
