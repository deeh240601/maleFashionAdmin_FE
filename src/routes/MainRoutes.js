import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const ProductMain = Loadable(lazy(() => import('views/product')));
const Color = Loadable(lazy(() => import('views/color')));
const Size = Loadable(lazy(() => import('views/size')));
const Category = Loadable(lazy(() => import('views/category')));
const Customer = Loadable(lazy(() => import('views/customer')));
const SaleOrder = Loadable(lazy(() => import('views/sale-order')));
const BuyOrder = Loadable(lazy(() => import('views/buy-order')));
const Supplier = Loadable(lazy(() => import('views/supplier')));

const MainRoutes = {
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

export default MainRoutes;
