'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations from '@/app/i18n';
import { Resource, createInstance } from 'i18next';

type Props = {
    children: React.ReactNode,
    locale: string,
    namespaces: string[],
    resources: Resource
}

const AppTranslateProvider = ({ children, locale, namespaces, resources }: Props) => {
    const i18n = createInstance();
    initTranslations(locale, namespaces, i18n, resources);
    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    )
}

export default AppTranslateProvider