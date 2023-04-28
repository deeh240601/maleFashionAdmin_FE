import axiosClient from './base';

const VoucherService = {
    create: (voucher) => {
        return axiosClient.post('/voucher/create', voucher);
    },
    update: (voucher) => {
        return axiosClient.patch('/voucher/update', voucher);
    },
    delete: (voucherId) => {
        return axiosClient.delete('/voucher/delete', voucherId);
    },
    deleteAll: (voucherIds) => {
        return axiosClient.post('/voucher/delete-all', { voucherIds });
    },
    getAll: () => {
        return axiosClient.get('/voucher/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/voucher/get/${id}`);
    }

};
export default VoucherService;
