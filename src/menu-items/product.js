import { IconCategory, IconPalette, IconRuler, IconShirt } from '@tabler/icons';

const product = {
    id: 'product',
    title: 'Sản phẩm',
    type: 'group',
    children: [
        {
            id: 'product-main',
            title: 'Sản phẩm chính',
            type: 'item',
            url: 'product',
            icon: IconShirt,
            breadcrumbs: false
        },
        {
            id: 'product-color',
            title: 'Màu sắc',
            type: 'item',
            url: 'product/color',
            icon: IconPalette,
            breadcrumbs: false
        },
        {
            id: 'product-size',
            title: 'Size',
            type: 'item',
            url: 'product/size',
            icon: IconRuler,
            breadcrumbs: false
        },
        {
            id: 'category',
            title: 'Loại sản phẩm',
            type: 'item',
            url: 'product/category',
            icon: IconCategory,
            breadcrumbs: false
        }

    ]
};

export default product;
