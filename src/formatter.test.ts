import { describe, expect, test, vi } from "vitest";
import { ProjectStates } from "./enums/projectStates";
import { TopicTypes } from "./enums/TopicTypes";
import {
  headlineFrom,
  horizontalLine,
  linebreak,
  listFrom,
  paragraphFrom,
  stateTextFrom,
  tableFrom,
  topicFrom,
} from "./formatter";

const TEST_STRING = "Foo";

function stateDescription(state: ProjectStates) {
  return `State: ${state}`;
}

describe("Formatter", () => {
  describe("Überschriften", () => {
    describe("Keine Konfiguration", () => {
      const headlineNoConfig = headlineFrom(TEST_STRING);

      test("Überschrift soll H1 in Markdown-Syntax sein", () => {
        expect(headlineNoConfig).toMatch(/# .*/);
      });
      test("Überschrift soll übergebenen String enthalten", () => {
        expect(headlineNoConfig).toMatch(TEST_STRING);
      });
      test("Nach Überschrift soll ein Umbruch stehen", () => {
        expect(headlineNoConfig).toMatch(/\n$/);
      });
      test("Ergebnis", () => {
        expect(headlineNoConfig).toMatch(/^# Foo\n$/);
      });
    });

    describe("Überschriftenlevel", () => {
      test("Level 2 Überschrift soll Markdown-H2 sein", () => {
        expect(headlineFrom(TEST_STRING, { level: 2 })).toMatch(/## .*/);
      });
      test("Level 3 Überschrift soll Markdown-H3 sein", () => {
        expect(headlineFrom(TEST_STRING, { level: 3 })).toMatch(/### .*/);
      });
      test("Level 5 Überschrift soll Markdown-H5 sein", () => {
        expect(headlineFrom(TEST_STRING, { level: 5 })).toMatch(/##### .*/);
      });

      test("Ergebnis (H3)", () => {
        expect(headlineFrom(TEST_STRING, { level: 3 })).toMatch(/^### Foo\n$/);
      });
    });

    describe("Überschriften-Ausrichtung", () => {
      const headlineCenterAligned = headlineFrom(TEST_STRING, {
        alignment: "center",
      });

      test(
        "Bei festgelegtem Alignment wird Überschrift " +
          "in HTML-Fassung ausgeliefert",
        () => {
          expect(headlineCenterAligned).toMatch(/^<h\d.*<\/h\d>/);
        },
      );

      test("Überschrift soll H1 in HTML-Syntax sein", () => {
        expect(headlineCenterAligned).toMatch(/<h1/);
      });

      test("Center-Alignment", () => {
        expect(headlineCenterAligned).toMatch('align="center"');
      });

      test("Rechts-Alignment", () => {
        expect(headlineFrom(TEST_STRING, { alignment: "right" })).toMatch(
          'align="right"',
        );
      });

      test("Ergebnis (Center-Alignment)", () => {
        expect(headlineCenterAligned).toMatch(
          /^<h1 align="center">Foo<\/h1>\n$/,
        );
      });
    });

    describe("Überschriften-Größeneinstellung (nicht Github-Kompatibel)", () => {
      const headlineSize16 = headlineFrom(TEST_STRING, {
        size: 16,
      });

      test(
        "Bei festgelegter Schriftgröße wird Überschrift " +
          "in HTML-Fassung ausgeliefert",
        () => {
          expect(headlineSize16).toMatch(/^<h\d.*<\/h\d>/);
        },
      );

      test("Überschrift soll H1 in HTML-Syntax sein", () => {
        expect(headlineSize16).toMatch(/<h1/);
      });

      test("Schriftgröße 16 wird in Style übernommen", () => {
        expect(headlineSize16).toMatch('style="font-size: 16px"');
      });

      test("Schriftgröße 420 wird in Style übernommen", () => {
        expect(headlineFrom(TEST_STRING, { size: 420 })).toMatch(
          'style="font-size: 420px"',
        );
      });

      test("Ergebnis (Center-Alignment)", () => {
        expect(headlineSize16).toMatch(
          /^<h1 style="font-size: 16px">Foo<\/h1>\n$/,
        );
      });
    });

    describe("Kombination", () => {
      const headlineKombination = headlineFrom(TEST_STRING, {
        level: 4,
        alignment: "center",
        size: 2,
      });

      test("Überschrift wird in HTML-Fassung ausgeliefert", () => {
        expect(headlineKombination).toMatch(/^<h\d.*Foo<\/h\d>/);
      });

      test("Überschrift soll H4 in HTML-Syntax sein", () => {
        expect(headlineKombination).toMatch(/<h4/);
      });

      test("Center-Alignment", () => {
        expect(headlineKombination).toMatch('align="center"');
      });

      test("Schriftgröße 2 wird in Style übernommen", () => {
        expect(headlineKombination).toMatch('style="font-size: 2px"');
      });
    });
  });

  describe("Paragraphen", () => {
    describe("Keine Konfiguration", () => {
      const paragraphNoConfig = paragraphFrom(TEST_STRING);

      test("Paragraph soll H1 in Markdown-Syntax sein", () => {
        expect(paragraphNoConfig).toMatch(/<p>.*<\/p>/);
      });
      test("Paragraph soll übergebenen String enthalten", () => {
        expect(paragraphNoConfig).toMatch(TEST_STRING);
      });
      test("Nach Paragraph soll ein Umbruch stehen", () => {
        expect(paragraphNoConfig).toMatch(/\n$/);
      });
      test("Ergebnis", () => {
        expect(paragraphNoConfig).toMatch(/^<p>Foo<\/p>\n$/);
      });
    });

    describe("Paragraphen-Ausrichtung", () => {
      const paragraphCenterAligned = paragraphFrom(TEST_STRING, {
        alignment: "center",
      });

      test(
        "Bei festgelegtem Alignment wird Paragraph " +
          "in HTML-Fassung ausgeliefert",
        () => {
          expect(paragraphCenterAligned).toMatch(/^<p.*<\/p>/);
        },
      );

      test("Center-Alignment", () => {
        expect(paragraphCenterAligned).toMatch('align="center"');
      });

      test("Rechts-Alignment", () => {
        expect(paragraphFrom(TEST_STRING, { alignment: "right" })).toMatch(
          'align="right"',
        );
      });

      test("Ergebnis (Center-Alignment)", () => {
        expect(paragraphCenterAligned).toMatch(
          /^<p align="center">Foo<\/p>\n$/,
        );
      });
    });
  });

  describe("Listen", () => {
    describe("Keine Tiefe", () => {
      test("Keine Elemente führen zu Leerstring", () => {
        expect(listFrom([])).toEqual("");
      });

      describe("Ein Listenelement", () => {
        const listElement = listFrom(["Foo"]);

        test("Ein Listenelement ist als Listenpunkt enthalten", () => {
          expect(listElement).toMatch(/^- Foo/);
        });

        test("Nach Listenelement erfolgt Umbruch", () => {
          expect(listElement).toMatch(/Foo\n$/);
        });
      });

      describe("Mehrere Listenelemente", () => {
        const listElements = listFrom(["Foo", "Bar", "Baz"]);

        test("Mehrere Listenelemente sind als Listenpunkte enthalten", () => {
          expect(listElements).toMatch(/^- Foo\n- Bar\n- Baz/);
        });

        test("Nach Listenelementen erfolgt Umbruch", () => {
          expect(listElements).toMatch(/Baz\n$/);
        });
      });
    });

    describe("Mit Tiefeneinstellung", () => {
      test("Keine Elemente führen zu Leerstring", () => {
        expect(listFrom([], 3)).toEqual("");
      });

      [
        { depth: 1, einrueckungMatch: /^- Foo/ },
        { depth: 2, einrueckungMatch: /^ {2}- Foo/ },
        { depth: 4, einrueckungMatch: /^ {6}- Foo/ },
      ].forEach(({ depth, einrueckungMatch }) => {
        describe(`Tiefe ${depth}`, () => {
          const listElement = listFrom(["Foo"], depth);

          test("Der Listenpunkt ist nicht eingerückt", () => {
            expect(listElement).toMatch(einrueckungMatch);
          });

          test("Nach Listenelement erfolgt Umbruch", () => {
            expect(listElement).toMatch(/Foo\n$/);
          });
        });
      });

      describe("Mehrere Listenelemente", () => {
        const listElements = listFrom(["Foo", "Bar", "Baz"], 3);

        test("Mehrere Listenelemente sind als Listenpunkte enthalten", () => {
          expect(listElements).toMatch(/^ {4}- Foo\n {4}- Bar\n {4}- Baz/);
        });

        test("Nach Listenelementen erfolgt Umbruch", () => {
          expect(listElements).toMatch(/Baz\n$/);
        });
      });
    });
  });

  describe("Tabellen", () => {
    const table = {
      headlines: ["Header 1", "Header 2"],
      content: [
        ["Content 1", "Content 2"],
        ["Content 3", "Content 4"],
      ],
    };

    test("Überschriften sind als solche in Tabelle enthalten", () => {
      expect(tableFrom(table.headlines, table.content)).toMatch(
        /^\|Header 1\|Header 2\|\n\|-+\|-+\|\n/,
      );
    });

    test("Inhalte sind in Tabelle enthalten", () => {
      expect(tableFrom(table.headlines, table.content)).toMatch(
        /\|Content 1\|Content 2\|\n\|Content 3\|Content 4\|/,
      );
    });

    test("Nach Tabelle folgt Umbruch", () => {
      expect(tableFrom(table.headlines, table.content)).toMatch(/\|\n$/);
    });
  });

  describe("Statustext", () => {
    vi.mock("./types/state.ts", () => ({
      stateDescription: vi.fn().mockImplementation((projectState) => ({
        icon: `Icon-${projectState}`,
        name: `Name-${projectState}`,
      })),
    }));

    [
      { state: ProjectStates.ACTIVE, testName: "Aktiv" },
      { state: ProjectStates.INACTIVE, testName: "Inaktiv" },
      { state: ProjectStates.PLANNED, testName: "Geplant" },
      { state: ProjectStates.WIP, testName: "WIP" },
      { state: ProjectStates.PAUSED, testName: "Pausiert" },
    ].forEach(({ state, testName }) => {
      test(`Statustext wird zusammengefügt für ${testName}`, () => {
        expect(stateTextFrom(state)).toEqual(`Icon-${state} Name-${state}`);
      });
    });
  });

  describe("Aktuelle Themen", () => {
    vi.mock("i18next", () => ({
      default: {
        t: vi.fn().mockImplementation((key: string) => key),
      },
    }));

    [
      {
        type: TopicTypes.LEARNING,
        typeName: "Erlernthemen",
        keyword: "Foo",
        expectedText: "🌱 topics.currentlyLearning **Foo**",
      },
    ].forEach(({ type, typeName, keyword, expectedText }) => {
      describe(`Thementyp ${typeName}`, () => {
        const topicText = topicFrom({
          type,
          keyword,
        });

        test(`Text für ${typeName} soll zusammengefügt werden`, () => {
          expect(topicText).toEqual(expectedText);
        });
      });
    });
  });

  test("Zeilenumbruch soll methodisch erzeugt werden können", () => {
    expect(linebreak()).toMatch(/^\n$/);
  });

  describe("Horizontale Linie", () => {
    describe("Einzellinie", () => {
      const horizontalLineNoConfig = horizontalLine(1);

      test("Linie soll enthalten sein", () => {
        expect(horizontalLineNoConfig).toMatch("---");
      });

      test("Vorab soll Umbruch erfolgen", () => {
        expect(horizontalLineNoConfig).toMatch(/^\n---/);
      });

      test("Nach Linie soll doppelter Umbruch erfolgen", () => {
        expect(horizontalLineNoConfig).toMatch(/---\n\n$/);
      });

      test("Ergebnis", () => {
        expect(horizontalLineNoConfig).toMatch(/^\n---\n\n$/);
      });
    });

    describe("Keine Konfiguration", () => {
      test("Entspricht Einzellinie", () => {
        expect(horizontalLine()).toMatch(/^\n---\n\n$/);
      });
    });

    describe("Doppellinie", () => {
      const horizontalLineNoConfig = horizontalLine(2);

      test("Linien sollen enthalten sein", () => {
        expect(horizontalLineNoConfig).toMatch(/---\n\n---/);
      });

      test("Ergebnis", () => {
        expect(horizontalLineNoConfig).toMatch(/^\n---\n\n---\n\n$/);
      });
    });
  });
});
