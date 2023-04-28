import { IconArchive, IconBuildingStore } from '@tabler/icons';


const license = {
    id: 'license',
    title: 'Chứng từ',
    type: 'group',
    children: [
        {
            id: 'sale-order',
            title: 'Bán hàng',
            type: 'collapse',
            icon: IconBuildingStore,
            children: [
                {
                    id: 'sale-order-id',
                    title: 'Đơn hàng (hóa đơn)',
                    type: 'item',
                    url: '/sale-order',
                    breadcrumbs: false
                },
                {
                    id: 'customer',
                    title: 'Khách hàng',
                    type: 'item',
                    url: '/customer',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'buy-order',
            title: 'Nhập hàng',
            type: 'collapse',
            icon: IconArchive,
            children: [
                {
                    id: 'buy-order-id',
                    title: 'Phiếu nhâp',
                    type: 'item',
                    url: '/buy-order',
                    breadcrumbs: false
                },
                {
                    id: 'suplier',
                    title: 'Nhà cung cấp',
                    type: 'item',
                    url: '/supplier',
                    breadcrumbs: false
                }
            ]

        }
    ]
};

export default license;
