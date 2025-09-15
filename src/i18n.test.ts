import i18next from "i18next";
import { beforeAll, describe, expect, test } from "vitest";
import { availableLanguages } from "./data/availableLanguages";
import { initI18N } from "./initI18n";

describe("I18N", () => {
  test('Vorbedingung: "Verfügbare Sprachen" enthält Sprachen', () => {
    expect(availableLanguages.length).toBeGreaterThan(0);
  });

  describe("Initialisierung", () => {
    beforeAll(async () => {
      await initI18N();
    });

    test("Standardsprache soll englisch sein", () => {
      expect(i18next.t("verification")).toEqual("JSON-Value for en");
    });

    describe("Verfügbare Sprachen", () => {
      availableLanguages.forEach((availableLanguage) => {
        test(`${availableLanguage.language} soll verfügbar sein`, async () => {
          await i18next.changeLanguage(availableLanguage.language);

          expect(i18next.t("verification")).toEqual(
            `JSON-Value for ${availableLanguage.language}`,
          );
        });
      });
    });
  });
});
