import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/auth/authentication/Login')));
const Notfound = Loadable(lazy(() => import('views/404')));


const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/403',
            element: <AuthLogin />
        },
        {
            path: '*',
            element: <Notfound />
        }
    ]
};

export default AuthenticationRoutes;
