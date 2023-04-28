import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Customer = Loadable(lazy(() => import('views/customer')));
const SaleOrder = Loadable(lazy(() => import('views/sale-order')));
const BuyOrder = Loadable(lazy(() => import('views/buy-order')));
const Supplier = Loadable(lazy(() => import('views/supplier')));

const StaffRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'customer',
            element: <Customer />
        },

        {
            path: 'sale-order',
            element: <SaleOrder />
        },
        {
            path: 'buy-order',
            element: <BuyOrder />
        },

        {
            path: 'supplier',
            element: <Supplier />
        }

    ]
};

export default StaffRoutes;
