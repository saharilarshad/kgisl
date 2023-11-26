'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
// import { useTranslation } from 'react-i18next';
import { getTranslations } from "@/app/initTranslations";
// import TranslationsProvider from '@/context/AppTranslationProvider';

const i18nNamespaces = ['profile'];

const DataApi = ({ locale }: { locale: string }) => {
    // const { t } = useTranslation('common')
    // const { t } = useTranslation()
    const [translations, setTranslations] = useState(null);

    const [dataKGISL, setDataKGISL] = useState(null)

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['kgislData'],
        queryFn: async () => {
            const res = await axios.get('https://reqres.in/api/users')
            return res.data
        }
    })

    console.log(data?.data)

    useEffect(() => {
        if (data) {
            setDataKGISL(data.data)
        }
    }, [data])


    useEffect(() => {
        getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
            setTranslations({ t, resources });
        });
    }, [locale]);

    console.log(dataKGISL)

    return (
        <>
            {translations &&
                <div className="p-5 flex flex-wrap h-full w-screen">
                    {dataKGISL && dataKGISL?.map((item: any) => (
                        <div key={item.id} className="p-3 flex flex-col border items-center rounded-md mx-5 my-5 h-80 w-52 justify-around">
                            <div className="w-48 h-24 items-center justify-center flex">
                                <Image src={item.avatar} alt="item" width={100} height={1} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <h3>{translations.t('First_Name')} : {item.first_name}</h3>
                                <h3>{translations.t('Last Name')} : {item.last_name}</h3>
                                <h3>Email : {item.email}</h3>
                            </div>

                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default DataApi