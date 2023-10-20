import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import { useGlobal } from "src/stores";

const globalStore = useGlobal();

export default ({ app }: any) => {
  // Create I18n instance
  const i18n = createI18n({
    locale: globalStore.getLang || "zh-TW",
    fallbackLocale: globalStore.getLang,
    messages,
  });

  // Tell app to use the I18n instance
  app.use(i18n);
};
