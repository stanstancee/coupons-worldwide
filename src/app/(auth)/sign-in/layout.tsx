import React from 'react';
import AuthWrapper from '@/components/auth-wrapper';

const SignInLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="sign-in-layout">

            <AuthWrapper>
                {children}
            </AuthWrapper>

        </div>
    );
};

export default SignInLayout;