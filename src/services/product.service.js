import axiosClient from './base';

const ProductService = {
    create: (product) => {
        return axiosClient.post('/product/create', product);
    },
    update: (product) => {
        return axiosClient.patch('/product/update', product);
    },
    delete: (productId) => {
        return axiosClient.delete('/product/delete', productId);
    },
    deleteAll: (productIds) => {
        return axiosClient.post('/product/delete-all', { productIds });
    },
    getAll: () => {
        return axiosClient.get('/product/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/product/get/${id}`);
    },
    getLikeCode: (code) => {
        return axiosClient.get(`/product/get-like-code/${code}`);
    },
    getByCode: (code) => {
        return axiosClient.get(`/product/get-by-code/${code}`);
    }

};
export default ProductService;
