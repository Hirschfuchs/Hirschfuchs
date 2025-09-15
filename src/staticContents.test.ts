import { beforeAll, describe, expect, test, vi } from "vitest";
import { availableLanguages } from "./data/availableLanguages";
import { generateHeader } from "./staticContents";

describe("Statische Inhalte (ohne Abhängigkeit zu Data)", () => {
  vi.mock("i18next", () => ({
    default: {
      t: (key: string) => key,
    },
  }));
  vi.mock("./formatter", () => ({
    headlineFrom: vi
      .fn()
      .mockImplementation(
        (headline, config) => `H${headline}-${config.alignment}\n`,
      ),
    paragraphFrom: vi.fn().mockImplementation((paragraph) => `P${paragraph}\n`),
    horizontalLine: vi.fn().mockReturnValue("HorizontalLine\n"),
    linebreak: vi.fn().mockReturnValue("Linebreak\n"),
  }));

  describe("Header", () => {
    let testHeader: string;

    beforeAll(async () => {
      testHeader = await generateHeader();
    });

    describe("Überschriften", () => {
      test("Header soll mit Hauptüberschrift beginnen", () => {
        expect(testHeader).toMatch(/^Hheadlines\.title/);
      });

      test("Header soll nach Überschrift Unterüberschrift liefern", () => {
        expect(testHeader).toMatch(/headlines\.title\S*\nHheadlines\.subtitle/);
      });

      test("Überschriften sollen zentriert sein", () => {
        expect(testHeader).toMatch("headlines.title-center");
        expect(testHeader).toMatch("headlines.subtitle-center");
      });
    });

    describe("Sprachenwechsel", () => {
      test("Überschrift für Sprachenwechsel ist rechtsbündig", () => {
        expect(testHeader).toMatch("Hheadlines.viewInOtherLangs-right");
      });

      test(`Sprachenwechsel soll ${availableLanguages.length - 1} Sprachen enthalten`, () => {
        const languageFlagsRegex = `(?:<a href="\\S*">\\S*<\\/a>\\s){${availableLanguages.length - 1}}`;

        expect(testHeader).toMatch(RegExp(languageFlagsRegex));
      });
    });

    test("Header beinhaltet Besuchszähler", () => {
      expect(testHeader).toMatch(
        'P<img src="https://komarev.com/ghpvc/?username=hirschfuchs&label=Profile%20views&color=0e75b6&style=flat" alt="hirschfuchs" />',
      );
    });
  });
});
