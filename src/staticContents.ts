import i18next from "i18next";
import {
  headlineFrom,
  horizontalLine,
  linebreak,
  paragraphFrom,
} from "./formatter";

export const generateHeader = async () => {
  const lines: string[] = [];

  const languageSelection: string[] = [];
  [
    { language: "en", file: "readme.md", emoji: "🇬🇧" },
    { language: "de", file: "readme.de.md", emoji: "🇩🇪" },
    { language: "it", file: "readme.it.md", emoji: "🇮🇹" },
    { language: "fr", file: "readme.fr.md", emoji: "🇫🇷" },
    { language: "es", file: "readme.es.md", emoji: "🇪🇸" },
    { language: "zh", file: "readme.zh.md", emoji: "🇹🇼" },
    { language: "ja", file: "readme.ja.md", emoji: "🇯🇵" },
    { language: "ko", file: "readme.ko.md", emoji: "🇰🇷" },
  ].forEach((availableLanguage) => {
    if (availableLanguage.language !== i18next.language) {
      languageSelection.push(
        `<a href="${availableLanguage.file}">${availableLanguage.emoji}</a>`,
      );
    }
  });
  lines.push(
    headlineFrom(i18next.t("headlines.viewInOtherLangs"), {
      level: 1,
      alignment: "right",
      size: 14,
    }),
    paragraphFrom(languageSelection.join(" "), { alignment: "right" }),
    "\n",
  );

  lines.push(
    headlineFrom(i18next.t("headlines.title"), {
      level: 1,
      alignment: "center",
    }),
    headlineFrom(i18next.t("headlines.subtitle"), {
      level: 3,
      alignment: "center",
    }),
    linebreak(),
    paragraphFrom(
      '<img src="https://komarev.com/ghpvc/?username=hirschfuchs&label=Profile%20views&color=0e75b6&style=flat" alt="hirschfuchs" />',
    ),
  );

  return lines.join("");
};

export const generateConnectWithMe = () => {
  // TODO: Dynamisch gestalten
  const lines: string[] = [];

  lines.push(
    headlineFrom(`🤙 ${i18next.t("headlines.level2.connectWithMe")}:`, {
      level: 2,
    }),
    "[![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/7310362/bono-fox)\n",
    "[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/bono-f-24a296142)\n",
    "[![XING](https://img.shields.io/badge/xing-%23006567.svg?style=for-the-badge&logo=xing&logoColor=white)](https://www.xing.com/profile/Bono_Fox/cv)\n",
    "\n",
    "[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://instagram.com/_bonofox_)\n",
    "[![Reddit](https://img.shields.io/badge/Reddit-%23FF4500.svg?style=for-the-badge&logo=Reddit&logoColor=white)](https://www.reddit.com/user/r-Hirsch)\n",
    "[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white)](https://fb.com/hipstermaultier)\n",
    "[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UCcuPCv8K5XQ_zzFot_TrlVQ)\n",
    "\n",
    "[![Wikipedia](https://img.shields.io/badge/Wikipedia-%23000000.svg?style=for-the-badge&logo=wikipedia&logoColor=white)](https://de.wikipedia.org/wiki/Benutzer:Fuchshirsch)\n",
    "\n",
    "[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/bonofox?country.x=DE&locale.x=de_DE)\n",
  );

  return lines.join("");
};

export const generateLanguagesAndTools = () => {
  // TODO: Dynamisch gestalten
  const lines: string[] = [];

  lines.push(
    headlineFrom(`⌨️ ${i18next.t("headlines.level2.languagesAndTools")}:`, {
      level: 2,
    }),
    headlineFrom(`‍💻 ${i18next.t("keywords.development")}`, { level: 3 }),
    headlineFrom(i18next.t("keywords.frontend"), { level: 4 }),
    "![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)\n",
    "![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)\n",
    "![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)\n",
    "![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)\n",
    "![SCSS](https://img.shields.io/badge/SCSS-%23CC6699?style=for-the-badge&logo=css3&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.backend"), { level: 4 }),
    "![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)\n",
    "![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.db"), { level: 4 }),
    "![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)\n",
    "![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.furtherLanguages"), { level: 4 }),
    "![LISP](https://img.shields.io/badge/Lisp-%23000000?style=for-the-badge&logoColor=white)\n",
    "![RUST (still learning)](https://img.shields.io/badge/Rust%20(still%20learning)-%23000000?style=for-the-badge&logo=rust&logoColor=white)\n",
    "![Bash](https://img.shields.io/badge/Bash-%234EAA25?style=for-the-badge&logo=gnubash&logoColor=white)\n",
    "![C](https://img.shields.io/badge/C-%23A8B9CC?style=for-the-badge&logo=c&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.frameworks"), { level: 4 }),
    "![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)\n",
    "![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)\n",
    "![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)\n",
    "![Spring Boot](https://img.shields.io/badge/Spring%20Boot-%236DB33F?style=for-the-badge&logo=springboot&logoColor=white)\n",
    "\n",
    headlineFrom(
      `${i18next.t("keywords.docs")} & ${i18next.t("keywords.print")}`,
      { level: 4 },
    ),
    "![Asciidoc](https://img.shields.io/badge/Asciidoc-%23E40046?style=for-the-badge&logo=asciidoctor&logoColor=white)\n",
    "![JasperSoft](https://img.shields.io/badge/JasperSoft-%234892bd?style=for-the-badge&logoColor=white)\n",
    "![LaTeX](https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white)\n",
    "![LibreOffice](https://img.shields.io/badge/LibreOffice-%2318A303?style=for-the-badge&logo=LibreOffice&logoColor=white)\n",
    "![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)\n",
    horizontalLine(),
    headlineFrom(`🛠️ ${i18next.t("keywords.tools")}`, { level: 3 }),
    headlineFrom(`IDEs: ${i18next.t("keywords.favourites")}`, { level: 4 }),
    "![WebStorm](https://img.shields.io/badge/webstorm-%231A1F6C?style=for-the-badge&logo=webstorm&logoColor=%231A1F6C&color=%230068FD)\n",
    "![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)\n",
    "\n",
    headlineFrom(`IDEs: ${i18next.t("keywords.didWorkWithThem")}`, {
      level: 4,
    }),
    "![Visual Studio Code/VSCodium](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=vscodium&logoColor=white)\n",
    "![Android Studio](https://img.shields.io/badge/Android%20Studio-3DDC84.svg?style=for-the-badge&logo=android-studio&logoColor=white)\n",
    "![LispWorks](https://img.shields.io/badge/LispWorks-%230A91CB?style=for-the-badge&logoColor=white\n)\n",
    "![NetBeans](https://img.shields.io/badge/NetBeansIDE-1B6AC6.svg?style=for-the-badge&logo=apache-netbeans-ide&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.os", { count: 3 }), { level: 4 }),
    "![Arch](https://img.shields.io/badge/Arch%20Linux-1793D1?logo=arch-linux&logoColor=fff&style=for-the-badge)\n",
    "![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)\n",
    "![Windows 11](https://img.shields.io/badge/Windows%2011-%230079d5.svg?style=for-the-badge&logo=Windows%2011&logoColor=white)\n",
    "\n",
    headlineFrom("Notepads", { level: 4 }),
    "- ![Sublime Text](https://img.shields.io/badge/sublime_text-%23575757.svg?style=for-the-badge&logo=sublime-text&logoColor=important)(![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black))\n",
    "- ![Notepad++](https://img.shields.io/badge/Notepad++-90E59A.svg?style=for-the-badge&logo=notepad%2b%2b&logoColor=black) (![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white))\n",
    "- ![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white)\n",
    "\n",
    headlineFrom(i18next.t("keywords.developmentProcess"), { level: 4 }),
    "![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)\n",
    "![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)\n",
    "![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)\n",
    "\n",
    "![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)\n",
    "![Bitbucket](https://img.shields.io/badge/bitbucket-%230047B3.svg?style=for-the-badge&logo=bitbucket&logoColor=white)\n",
    "![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)\n",
    "\n",
    "![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)\n",
    "![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)\n",
    "\n",
    "![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)\n",
    "![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)\n",
    "![Jasmine](https://img.shields.io/badge/-Jasmine-%238A4182?style=for-the-badge&logo=Jasmine&logoColor=white)\n",
    "![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)\n",
    "\n",
    "![Renovate](https://img.shields.io/badge/Renovate-%231A1F6C?style=for-the-badge&logo=renovate&logoColor=white)\n",
    "![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)\n",
    "![CodeCov](https://img.shields.io/badge/codecov-%23ff0077.svg?style=for-the-badge&logo=codecov&logoColor=white)\n",
    horizontalLine(),
    headlineFrom(`🔨 ${i18next.t("keywords.nonDevTools")}`, { level: 3 }),
    "![Adobe Photoshop](https://img.shields.io/badge/adobe%20photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white)\n",
    "![Adobe Lightroom Classic](https://img.shields.io/badge/Adobe%20Lightroom%20Classic-31A8FF.svg?style=for-the-badge&logo=Adobe%20Lightroom%20Classic&logoColor=white)\n",
    "\n",
    "![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)\n",
    "![Blender](https://img.shields.io/badge/blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white)\n",
    "![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)\n",
    horizontalLine(),
    headlineFrom(`🎮 ${i18next.t("keywords.gaming")}`, { level: 3 }),
    "![Steam](https://img.shields.io/badge/steam-%23000000.svg?style=for-the-badge&logo=steam&logoColor=white)\n",
    "![nVIDIA](https://img.shields.io/badge/nVIDIA-%2376B900.svg?style=for-the-badge&logo=nVIDIA&logoColor=white)\n",
    "\n",
    "![Switch](https://img.shields.io/badge/Switch-E60012?style=for-the-badge&logo=nintendo-switch&logoColor=white)\n",
    "![Wii](https://img.shields.io/badge/Wii-8B8B8B?style=for-the-badge&logo=wii&logoColor=white)\n",
    "![Xbox](https://img.shields.io/badge/xbox-%23107C10.svg?style=for-the-badge&logo=xbox&logoColor=white)\n",
    "\n",
    "![Godot Engine](https://img.shields.io/badge/GODOT-%23FFFFFF.svg?style=for-the-badge&logo=godot-engine)\n",
    horizontalLine(2),
    headlineFrom(`🤖 ${i18next.t("keywords.personalAssistance")}`, {
      level: 3,
    }),
    "![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)\n",
    "![Amazon Alexa](https://img.shields.io/badge/amazon%20alexa-52b5f7?style=for-the-badge&logo=amazon%20alexa&logoColor=white)\n",
    "\n",
    "- But my goal for the near future is building my own system, so that these guys right here become obsolete ;)",
  );

  return lines.join("");
};

export const generateStats = () =>
  paragraphFrom(
    '<img align="center" src="https://github-readme-stats.vercel.app/api?username=hirschfuchs&show_icons=true&locale=en" alt="hirschfuchs" />',
  );
