import axiosClient from './base';

const SizeService = {
    create: (size) => {
        return axiosClient.post('/size/create', size);
    },
    update: (size) => {
        return axiosClient.patch('/size/update', size);
    },
    delete: (sizeId) => {
        return axiosClient.delete('/size/delete', sizeId);
    },
    deleteAll: (sizeIds) => {
        return axiosClient.post('/size/delete-all', { sizeIds });
    },
    getAll: () => {
        return axiosClient.get('/size/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/size/get/${id}`);
    }

};
export default SizeService;
