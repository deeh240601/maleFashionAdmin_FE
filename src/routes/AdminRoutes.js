import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const ProductMain = Loadable(lazy(() => import('views/product')));
const Color = Loadable(lazy(() => import('views/color')));
const Size = Loadable(lazy(() => import('views/size')));
const Category = Loadable(lazy(() => import('views/category')));
const Voucher = Loadable(lazy(() => import('views/voucher')));
const Staff = Loadable(lazy(() => import('views/staff')));

const AdminRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'product',
            children: [
                {
                    path: '',
                    element: <ProductMain />
                }
            ]
        },
        {
            path: 'product',
            children: [
                {
                    path: 'color',
                    element: <Color />
                }
            ]
        },
        {
            path: 'product',
            children: [
                {
                    path: 'size',
                    element: <Size />
                }
            ]
        },
        {
            path: 'product',
            children: [
                {
                    path: 'category',
                    element: <Category />
                }
            ]
        },
        {
            path: 'voucher',
            element: <Voucher />
        },
        {
            path: 'staff',
            element: <Staff />
        }

    ]
};

export default AdminRoutes;
