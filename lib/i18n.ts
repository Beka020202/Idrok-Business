// Every visible text lives here, in Uzbek (Latin) and Russian, with the SAME keys.
// TypeScript forces `ru` to have exactly the same keys as `uz`.

export type Locale = "uz" | "ru";

const uz = {
  appName: "IDROK BUSINESS",
  dashboardTitle: "Boshqaruv paneli",
  dashboardSubtitle: "Tadbiringiz bir qarashda",
  demoBadge: "Demo ma'lumot",
  demoNote: "Quyidagi raqamlar namunaviy. Haqiqiy ma'lumot emas.",
  marketOverview: "Umumiy",
  marketAmazon: "Amazon",
  marketUzum: "Uzum",
  levelLabel: "Daraja",
  level0Name: "Boshlovchi",
  level0Rule: "Faqat arzon va oddiy mahsulotlar",
  progressTitle: "Keyingi darajagacha",
  progressHint: "Tasdiqlangan sof foyda va vasiyning ma'qullashi kerak.",
  lockedTitle: "1-daraja",
  lockedHint: "Qulfni ochish uchun tasdiqlangan foyda va vasiy ma'qullashi kerak.",
  statResearched: "Tadqiq qilingan mahsulotlar",
  statReview: "Ko'rib chiqishni kutmoqda",
  statOpportunities: "Istiqbolli imkoniyatlar",
  safetyTitle: "Xavfsizlik qoidasi",
  safetyBody: "Sotib olish va to'lov o'chirilgan. Hech narsa kattalarning ma'qullashisiz amalga oshmaydi.",
  navHome: "Bosh sahifa",
  navProducts: "Mahsulotlar",
  navApprovals: "Ma'qullash",
  navLearn: "Darslar",
  navSettings: "Sozlamalar",
  langUz: "O'zbekcha",
  langRu: "Русский",
  themeLight: "Kunduzgi",
  themeDark: "Tungi",
} as const;

type Keys = keyof typeof uz;

const ru: Record<Keys, string> = {
  appName: "IDROK BUSINESS",
  dashboardTitle: "Панель управления",
  dashboardSubtitle: "Ваш бизнес с первого взгляда",
  demoBadge: "Демо-данные",
  demoNote: "Цифры ниже — примеры, а не реальные данные.",
  marketOverview: "Общее",
  marketAmazon: "Amazon",
  marketUzum: "Uzum",
  levelLabel: "Уровень",
  level0Name: "Новичок",
  level0Rule: "Только дешёвые и простые товары",
  progressTitle: "До следующего уровня",
  progressHint: "Нужна подтверждённая чистая прибыль и одобрение опекуна.",
  lockedTitle: "Уровень 1",
  lockedHint: "Чтобы открыть, нужна подтверждённая прибыль и одобрение опекуна.",
  statResearched: "Изучено товаров",
  statReview: "Ждут проверки",
  statOpportunities: "Перспективные варианты",
  safetyTitle: "Правило безопасности",
  safetyBody: "Покупки и оплата отключены. Ничего не происходит без одобрения взрослого.",
  navHome: "Главная",
  navProducts: "Товары",
  navApprovals: "Одобрения",
  navLearn: "Уроки",
  navSettings: "Настройки",
  langUz: "O'zbekcha",
  langRu: "Русский",
  themeLight: "Светлая",
  themeDark: "Тёмная",
};

export const messages: Record<Locale, Record<Keys, string>> = { uz, ru };
export type MessageKey = Keys;
