import axiosClient from './base';

const SaleOrderService = {
    create: (saleOrder) => {
        return axiosClient.post('/saleOrder/create', saleOrder);
    },
    updateStatus: (object) => {
        return axiosClient.post('/saleOrder/update-status', object);
    },
    update: (saleOrder) => {
        console.log(saleOrder);
        return axiosClient.patch('/saleOrder/update', saleOrder);
    },
    delete: (saleOrderId) => {
        return axiosClient.delete('/saleOrder/delete', saleOrderId);
    },
    deleteAll: (saleOrderIds) => {
        return axiosClient.post('/saleOrder/delete-all', { saleOrderIds });
    },
    getAll: () => {
        return axiosClient.get('/saleOrder/get-all-force');
    },
    getById: (id) => {
        return axiosClient.get(`/saleOrder/get/${id}`);
    },
    getFullById: (id) => {
        return axiosClient.get(`/saleOrder/get-full/${id}`);
    },

};
export default SaleOrderService;
