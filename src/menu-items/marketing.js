import { IconGift } from '@tabler/icons';

const marketing = {
    id: 'marketing',
    title: 'marketing',
    type: 'group',
    children: [
        {
            id: 'voucher',
            title: 'Khuyến mãi',
            type: 'item',
            url: 'voucher',
            icon: IconGift,
            breadcrumbs: false
        }
    ]
};

export default marketing;
