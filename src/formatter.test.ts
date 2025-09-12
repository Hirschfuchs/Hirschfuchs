import { describe, expect, test } from "vitest";
import { headlineFrom } from "./formatter";

const TEST_STRING = "Foo";

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

    describe("Überschriften-");
  });
});
