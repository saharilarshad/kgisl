'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/next-i18next.config';
import { ChangeEvent, useEffect } from 'react';
// import Cookies from 'js-cookie';

const LanguageSwitcher = () => {
    const router = useRouter();
    const currentPathname = usePathname();
    const { i18n } = useTranslation();

    // useEffect(() => {
    //     const { i18n } = useTranslation();

    //     router.refresh();
    // }, [router]);

    const currentLocale = i18n.language;
    // const currentLocale = i18nConfig.defaultLocale;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value

        const days = 1
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        const expires = ' expires=' + date.toUTCString()
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`
        // Cookies.set('NEXT_LOCALE', newLocale, { expires: 1, path: '/' });

        if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
            router.push('/' + newLocale + currentPathname)
        } else {
            router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
        }
    }

    // router.refresh()

    return (

        <select onChange={handleChange} value={currentLocale} className='text-black p-1 rounded-md'>
            <option value="en">English</option>
            <option value="ms">Malay</option>
        </select>

    );
}

export default LanguageSwitcher


// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//     const { i18n } = useTranslation();
//     const changeLanguage = async(language) => {
//         await i18n.changeLanguage(language);
//     }

//     return (
//         <div className='flex items-center gap-3'>
//             <button onClick={() => changeLanguage('en')} className='border-r-2 p-3'>EN</button>
//             <button onClick={() => changeLanguage('ms')}>MY</button>
//         </div>
//     );
// }

// export default LanguageSwitcher