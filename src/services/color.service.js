import axiosClient from './base';

const ColorService = {
    create: (color) => {
        return axiosClient.post('/color/create', color);
    },
    update: (color) => {
        console.log(color);
        return axiosClient.patch('/color/update', color);
    },
    delete: (colorId) => {
        return axiosClient.delete('/color/delete', colorId);
    },
    deleteAll: (colorIds) => {
        return axiosClient.post('/color/delete-all', { colorIds });
    },
    getAll: () => {
        return axiosClient.get('/color/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/color/get/${id}`);
    }

};
export default ColorService;
