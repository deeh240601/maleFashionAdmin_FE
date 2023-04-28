import axiosClient from './base';

const SupplierService = {
    create: (supplier) => {
        return axiosClient.post('/supplier/create', supplier);
    },
    update: (supplier) => {
        return axiosClient.patch('/supplier/update', supplier);
    },
    delete: (supplierId) => {
        return axiosClient.delete('/supplier/delete', supplierId);
    },
    deleteAll: (supplierIds) => {
        return axiosClient.post('/supplier/delete-all', { supplierIds });
    },
    getAll: () => {
        return axiosClient.get('/supplier/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/supplier/get/${id}`);
    }

};
export default SupplierService;
