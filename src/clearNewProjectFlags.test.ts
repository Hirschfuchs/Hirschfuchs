import { readFileSync } from "fs";
import { DateTime } from "luxon";
import { writeFileSync } from "node:fs";
import * as tsMorph from "ts-morph";
import { afterAll, beforeEach, describe, expect, test, vi } from "vitest";
import { clearNewProjectFlags } from "./clearNewProjectFlags";

const CURRENT_FILE = "src/clearNewProjectFlags-ist.helper.ts";
const TARGET_FILE = "src/clearNewProjectFlags-soll.helper.ts";

const createCurrentFile = () => {
  writeFileSync(
    CURRENT_FILE,
    'import { ProjectStates } from "./enums/projectStates";\n' +
      'import { TypesPlannedProject } from "./types/typesPlannedProject";\n' +
      "\n" +
      "/**\n" +
      " * Diese Datei wird ausschließlich im Test genutzt, um die erfolgreiche\n" +
      " * Funktionsweise von ts-morph sicherzustellen.\n" +
      " */\n" +
      "export const plannedProjects: TypesPlannedProject[] = [\n" +
      "  {\n" +
      '    name: "Flag auf False",\n' +
      '    description: "Dieses Projekt soll unverändert bleiben",\n' +
      '    emoji: ":)",\n' +
      "    state: ProjectStates.ACTIVE,\n" +
      "    newFlag: false,\n" +
      "  },\n" +
      "  {\n" +
      '    name: "Altes Flag",\n' +
      '    description: "Dieses Projekt soll das Flag entfernen",\n' +
      '    emoji: ":)",\n' +
      "    state: ProjectStates.ACTIVE,\n" +
      "    newFlag: {\n" +
      `      since: "${DateTime.now().minus({ month: 1 }).toISODate()}",\n` +
      '      newDescription: "Dieses Flag soll entfernt werden",\n' +
      "    },\n" +
      "  },\n" +
      "  {\n" +
      '    name: "Kein Flag",\n' +
      '    description: "Dieses Projekt soll unverändert bleiben",\n' +
      '    emoji: ":)",\n' +
      "    state: ProjectStates.WIP,\n" +
      "  },\n" +
      "  {\n" +
      '    name: "Neues Flag",\n' +
      '    description: "Dieses Projekt soll unverändert bleiben",\n' +
      '    emoji: ":)",\n' +
      "    state: ProjectStates.ACTIVE,\n" +
      "    newFlag: {\n" +
      `      since: "${DateTime.now().toISODate()}",\n` +
      '      newDescription: "Dieses Flag soll nicht entfernt werden",\n' +
      "    },\n" +
      "  },\n" +
      "];\n",
  );
};

describe('"Neues Projekt" Flags entfernen', () => {
  vi.mock("ts-morph", async (original) => {
    const actual = (await original()) as typeof tsMorph;
    return {
      ...actual,
      Project: vi.fn().mockImplementation(() => {
        const project = new actual.Project();
        return {
          ...project,
          addSourceFileAtPath: vi.fn().mockImplementation((path: string) => {
            return project.addSourceFileAtPath(CURRENT_FILE);
          }),
        };
      }),
    };
  });

  beforeEach(() => {
    createCurrentFile();
  });

  test("[VORBEDINGUNG] Ausgangszustand unterscheidet sich von SOLL-Zustand", () => {
    const currentFile = readFileSync(CURRENT_FILE, "utf-8");
    const targetFile = readFileSync(TARGET_FILE, "utf-8");

    expect(currentFile).not.toBe(targetFile);
  });

  test("Neues Projekt Flag wird entfernt", () => {
    clearNewProjectFlags();

    const currentFile = readFileSync(CURRENT_FILE, "utf-8");
    const targetFile = readFileSync(TARGET_FILE, "utf-8");

    expect(currentFile).toBe(targetFile);
  });

  afterAll(() => {
    createCurrentFile();
  });
});
