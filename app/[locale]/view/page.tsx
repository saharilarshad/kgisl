'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { employeeStore } from "@/store/store"
import { getTranslations } from "@/app/initTranslations";
import TranslationsProvider from '@/context/AppTranslationProvider';

const i18nNamespaces = ['viewEmployee'];

const ViewPage = ({ params: { locale } }: { params: { locale: string } }) => {
    const [translations, setTranslations] = useState(null);
    const [data, setData] = useState(null)
    const [deleteTrigger, setDeleteTrigger] = useState(0);

    const fetchData = () => {
        setDeleteTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        const getDataLocalStorage = localStorage.getItem('persist-employee')

        setData(JSON.parse(getDataLocalStorage))

        console.log('getDataLocalStorage', getDataLocalStorage)

    }, [deleteTrigger])

    const removeEmploy = employeeStore((state: any) => state?.removeEmployee)

    useEffect(() => {
        getTranslations(locale, i18nNamespaces).then(({ t, resources }) => {
            setTranslations({ t, resources });
        });
    }, [locale]);

    console.log(data)

    return (
        <>
            {translations &&
                <div className="p-5 flex flex-wrap h-full w-screen">
                    {data && data.state.employee?.map((item: any) => (
                        <div key={item.id} className="p-3 flex flex-col border items-center rounded-md mx-5 my-5 h-80 w-52 justify-around">
                            <div className="w-48 h-24 items-center justify-center flex">
                                <Image src={`/uploads/${item.profileImage}`} alt="item" width={100} height={1} />
                            </div>

                            <div className="flex flex-col gap-1">

                                {/* <h3 className="text-xs items-center justify-center flex">{item.name}</h3> */}
                                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap w-full">{translations.t('Name')} : {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}</h3>

                                {/* <h3>RM {parseFloat(item.price)}</h3> */}
                                <h3>{translations.t('Salary')} : RM {item.salary}</h3>
                                <h3>{translations.t('Age')} : {item.age}</h3>
                            </div>
                            <div className="p-1 flex flex-row gap-2 items-center">
                                <Link href={`/edit/${item.id}`}>
                                    <button className="text-sm justify-center text-white border-2 border-white rounded-md">
                                        <h3 className="mx-2 my-1">{translations.t('Edit')}</h3>
                                    </button>
                                </Link>
                                <button className="text-sm justify-center text-white border-2 border-white rounded-md">
                                    <h3 className="mx-2 my-1" onClick={() => {
                                        removeEmploy(item.id)
                                        fetchData()
                                    }}>{translations.t('Delete')}</h3>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}

export default ViewPage