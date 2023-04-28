import { IconUser } from '@tabler/icons';

const internal = {
    id: 'internal',
    title: 'Nội bộ',
    type: 'group',
    children: [
        {
            id: 'staff',
            title: 'Nhân viên',
            type: 'item',
            url: 'staff',
            icon: IconUser,
            breadcrumbs: false
        }

    ]
};

export default internal;
