import i18next from "i18next";
import * as fs from "node:fs";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { availableLanguages } from "./data/availableLanguages";
import { generateReadme } from "./generateReadme";

describe("Readme Generator", () => {
  vi.mock("fs", () => ({
    writeFile: vi.fn(),
  }));
  vi.mock("i18next", () => ({
    default: {
      t: vi.fn().mockImplementation((key: string) => key),
      changeLanguage: vi.fn(),
    },
  }));
  vi.mock("./dynamicContents", () => ({
    generateInfos: vi.fn().mockReturnValue("Infos\n"),
    generateNewProjectsHighlight: vi.fn().mockReturnValue("NewProjects\n"),
    generatePlannedProjects: vi.fn().mockReturnValue("PlannedProjects\n"),
    generateTopics: vi.fn().mockReturnValue("Topics\n"),
  }));
  vi.mock("./formatter", () => ({
    horizontalLine: vi.fn().mockReturnValue("HorizontalLine\n"),
    linebreak: vi.fn().mockReturnValue("Linebreak\n"),
  }));
  vi.mock("./staticContents", () => ({
    generateConnectWithMe: vi.fn().mockReturnValue("ConnectWithMe\n"),
    generateHeader: vi.fn().mockReturnValue("Header\n"),
    generateLanguagesAndTools: vi.fn().mockReturnValue("LanguagesAndTools\n"),
    generateStats: vi.fn().mockReturnValue("Stats\n"),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Gewählte Sprache", () => {
    describe("Default", () => {
      describe("I18N-Sprache", () => {
        test("Default-Sprache wird auf englisch gesetzt", async () => {
          await generateReadme();

          expect(i18next.changeLanguage).toHaveBeenCalledExactlyOnceWith("en");
        });
      });

      describe("Dateiendung", () => {
        test(
          "Standardmäßig soll keine Sprache " +
            "in der Dateiendung enthalten sein",
          async () => {
            await generateReadme();

            expect(fs.writeFile).toHaveBeenCalledOnce();
            expect(fs.writeFile).toHaveBeenCalledWith(
              "./readme.md",
              expect.anything(),
              expect.anything(),
            );
          },
        );
      });
    });

    availableLanguages.forEach((availableLanguage) => {
      describe(`${availableLanguage.emoji} ${availableLanguage.language}`, () => {
        describe("I18N-Sprache", () => {
          test(
            `Sprache wird erfolgreich auf ` +
              `${availableLanguage.language} gesetzt`,
            async () => {
              await generateReadme(availableLanguage.language);

              expect(i18next.changeLanguage).toHaveBeenCalledExactlyOnceWith(
                availableLanguage.language,
              );
            },
          );
        });

        describe("Dateiendung", () => {
          test(`Dateiendung soll ${availableLanguage.language} enthalten`, async () => {
            await generateReadme(availableLanguage.language);

            expect(fs.writeFile).toHaveBeenCalledOnce();
            expect(fs.writeFile).toHaveBeenCalledWith(
              `./readme.${availableLanguage.language}.md`,
              expect.anything(),
              expect.anything(),
            );
          });
        });
      });
    });
  });

  describe("Inhalt", () => {
    [
      "Header",
      "Infos",
      "NewProjects",
      "PlannedProjects",
      "Topics",
      "ConnectWithMe",
      "LanguagesAndTools",
      "Stats",
    ].forEach((section) => {
      test(`Soll Sektion zu ${section} enthalten`, async () => {
        await generateReadme();

        const textinhalt = vi.mocked(fs).writeFile.mock.calls[0][1];

        expect(textinhalt).toMatch(section);
      });
    });
  });

  describe("Fehlerfall", () => {
    test("Fehler beim Schreiben der Datei soll geworfen werden", async () => {
      vi.mocked(fs.writeFile).mockImplementation(
        (_file, _content, errorCallback) => {
          return errorCallback({
            message: "Fehler beim Schreiben der Datei",
            name: "Schreibefehler",
          });
        },
      );

      await expect(generateReadme()).rejects.toThrowError(
        "Fehler beim Generieren der Readme-Datei!",
      );
    });
  });
});
