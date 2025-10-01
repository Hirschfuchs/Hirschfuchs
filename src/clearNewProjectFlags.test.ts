import { readFileSync } from "fs";
import * as tsMorph from "ts-morph";
import { describe, expect, test, vi } from "vitest";
import { clearNewProjectFlags } from "./clearNewProjectFlags";

/**
 * ACHTUNG, FEHLENDE IDEMPOTENZ!
 * Dieser Test ist aktuell relativ wackelig.
 *
 * Zum einen ist er datumsabhängig, was kein großes Problem darstellt,
 * aber nicht sonderlich sauber ist.
 *
 * Zum anderen manipuliert AST hier aber eine Datei.
 * Da auch die korrekte Ausführung von AST und nicht nur gemockte Aufrufe
 * getestet werden sollen, ist dies aber aktuell der beste Ansatz.
 * Die Tests müssen sequenziell ausgeführt werden und sind nicht idempotent.
 * Nach Ausführung der Tests müssen die Changes wieder zurückgesetzt werden.
 */

const CURRENT_FILE = "src/clearNewProjectFlags-ist.helper.ts";
const TARGET_FILE = "src/clearNewProjectFlags-soll.helper.ts";

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

  test.sequential(
    "[VORBEDINGUNG] Ausgangszustand unterscheidet sich von SOLL-Zustand",
    () => {
      const currentFile = readFileSync(CURRENT_FILE, "utf-8");
      const targetFile = readFileSync(TARGET_FILE, "utf-8");

      expect(currentFile).not.toBe(targetFile);
    },
  );

  test.sequential("Neues Projekt Flag wird entfernt", () => {
    clearNewProjectFlags();

    const currentFile = readFileSync(CURRENT_FILE, "utf-8");
    const targetFile = readFileSync(TARGET_FILE, "utf-8");

    expect(currentFile).toBe(targetFile);
  });
});
