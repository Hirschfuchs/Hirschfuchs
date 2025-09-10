import i18next from "i18next";
import I18NexFsBackend from "i18next-fs-backend";

export const initI18N = async () => {
  console.log("Initialisiere Lokalisierung");

  await i18next.use(I18NexFsBackend).init({
    lng: "en",
    fallbackLng: "en",
    backend: {
      loadPath: "src/data/locales/{{lng}}.json",
    },
  });
};
