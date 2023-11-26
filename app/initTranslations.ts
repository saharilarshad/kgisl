import initTranslations from '@/app/i18n';

export const getTranslations = (locale: string, namespaces: string[]) => {
  return initTranslations(locale, namespaces);
};