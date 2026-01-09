import { Suspense } from 'react';
import LoginClient from './LoginClient';

const LoginPage = () => {

    return (
      <Suspense fallback={null}>
        <LoginClient />
      </Suspense>
    );

};

export default LoginPage;