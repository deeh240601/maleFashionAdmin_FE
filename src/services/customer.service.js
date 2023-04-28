import axiosClient from './base';

const CustomerService = {
    create: (customer) => {
        return axiosClient.post('/customer/create', customer);
    },
    update: (customer) => {
        return axiosClient.patch('/customer/update', customer);
    },
    delete: (customerId) => {
        return axiosClient.delete('/customer/delete', customerId);
    },
    deleteAll: (customerIds) => {
        return axiosClient.post('/customer/delete-all', { customerIds });
    },
    getAll: () => {
        return axiosClient.get('/customer/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/customer/get/${id}`);
    }

};
export default CustomerService;
