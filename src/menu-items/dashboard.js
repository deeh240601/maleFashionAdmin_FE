import { IconDashboard } from '@tabler/icons';

const icons = { IconDashboard };

const dashboard = {
    id: 'dashboard',
    title: 'Chung',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Thống kê',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
