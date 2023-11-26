'use client'

import { createContext, useContext, useState } from 'react';

const ApiCacheContext = createContext();

export const ApiCacheProvider = ({ children }) => {
    const [apiCache, setApiCache] = useState({});

    const cacheApiResponse = (key, data) => {
        setApiCache((prevCache) => ({
            ...prevCache,
            [key]: data,
        }));
    };

    const getCachedApiResponse = (key) => apiCache[key];

    return (
        <ApiCacheContext.Provider value={{ cacheApiResponse, getCachedApiResponse }}>
            {children}
        </ApiCacheContext.Provider>
    );

}

export const useApiCache = () => {
    const context = useContext(ApiCacheContext);
    if (!context) {
        throw new Error('useApiCache must be used within an ApiCacheProvider');
    }
    return context;
};