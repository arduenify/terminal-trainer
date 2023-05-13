import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ModernLoader.css';

const ModernLoader = () => {
    const [loading, setLoading] = useState(false);
    const globalLoading = useSelector((state) => state.loading.loading);

    useEffect(() => {
        setLoading(globalLoading);
    }, [globalLoading]);

    return (
        <div className={`modern-loader-container ${loading ? 'visible' : ''}`}>
            <div className='modern-loader'>
                <div className='spinner'></div>
            </div>
        </div>
    );
};

export default ModernLoader;
