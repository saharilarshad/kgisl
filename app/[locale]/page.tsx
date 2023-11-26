'use client'
// mport ViewPage from "./view/page"
// import initTranslations from '@/app/i18n';
import { getTranslations } from "@/app/initTranslations";
import TranslationsProvider from '@/context/AppTranslationProvider';
import DataApi from "./profileuserapi/page";
import { useEffect, useState } from "react";

const i18nNamespaces = ['profile'];


const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  // const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const [translations, setTranslations] = useState(null);

  useEffect(() => {
    getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
      setTranslations({ t, resources });
    });
  }, [locale]);


  return (
    <>
      {/* <ViewPage /> */}
      {translations &&
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={translations.resources}
        >
          <DataApi locale={locale}/>
        </TranslationsProvider>
      }
    </>

  )
}

export default Home;
