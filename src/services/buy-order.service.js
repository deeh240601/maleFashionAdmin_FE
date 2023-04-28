import axiosClient from './base';

const BuyOrderService = {
    create: (buyOrder) => {
        return axiosClient.post('/buy-order/create', buyOrder);
    },
    update: (buyOrder) => {
        console.log(buyOrder);
        return axiosClient.patch('/buy-order/update', buyOrder);
    },
    delete: (buyOrderId) => {
        return axiosClient.delete('/buy-order/delete', buyOrderId);
    },
    deleteAll: (buyOrderIds) => {
        return axiosClient.post('/buy-order/delete-all', { buyOrderIds });
    },
    getAll: () => {
        return axiosClient.get('/buy-order/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/buy-order/get/${id}`);
    },

    getTotalOrder: () => {
        return axiosClient.get(`/buy-order/get-total-order`);
    },

    getTotalBuyOrder: () => {
        return axiosClient.get(`/buy-order/get-total-buy-order`);
    }

};
export default BuyOrderService;
