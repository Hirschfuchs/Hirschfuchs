import { DateTime } from "luxon";
import { Project, ts } from "ts-morph";
import SyntaxKind = ts.SyntaxKind;

export const clearNewProjectFlags = () => {
  const fileManipulation = new Project();
  const file = fileManipulation.addSourceFileAtPath(
    "src/data/plannedProjects.ts",
  );
  const plannedProjects = file.getVariableDeclaration("plannedProjects");
  if (plannedProjects === undefined) {
    return;
  }

  const initializer = plannedProjects.getInitializer();

  if (
    !initializer ||
    initializer.getKind() !== SyntaxKind.ArrayLiteralExpression
  ) {
    return;
  }

  initializer
    .asKindOrThrow(SyntaxKind.ArrayLiteralExpression)
    .getElements()
    .forEach((child) => {
      const typedChild = child.asKindOrThrow(
        SyntaxKind.ObjectLiteralExpression,
      );
      typedChild.getProperty("newFlag");

      const newFlag = typedChild.getProperty("newFlag");
      if (newFlag !== undefined && newFlag.getText() !== "false") {
        const newFlagTyped = newFlag
          .asKindOrThrow(SyntaxKind.PropertyAssignment)
          .getInitializer()
          ?.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
        const newDateString = newFlagTyped
          ?.getProperty("since")
          ?.asKindOrThrow(SyntaxKind.PropertyAssignment)
          .getInitializer()
          ?.asKindOrThrow(SyntaxKind.StringLiteral)
          .getLiteralText();

        if (newDateString === undefined) {
          return;
        }

        const newDate = DateTime.fromISO(newDateString);

        if (newDate.diffNow("months").months < -1) {
          console.log(
            `Clearing newFlag for ${typedChild.getProperty("name")?.asKindOrThrow(SyntaxKind.PropertyAssignment).getInitializer()?.asKindOrThrow(SyntaxKind.StringLiteral).getText()}`,
          );
          newFlag
            .asKindOrThrow(SyntaxKind.PropertyAssignment)
            .setInitializer("false");
        }
      }
    });

  file.saveSync();
};

clearNewProjectFlags();
