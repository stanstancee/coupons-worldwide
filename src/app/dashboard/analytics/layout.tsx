import React from 'react';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Coupons Worldwide | Analytics",
    description: "Coupons Worldwide Analytics",
    category: "Business & Finance",
};


const AnalyticsLayout = ({ children }:{
    children: React.ReactNode
} ) => {

    return (
        <main>{children}</main>
    )

}


export default AnalyticsLayout;