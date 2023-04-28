import axiosClient from './base';

const StaffService = {
    create: (staff) => {
        return axiosClient.post('/staff/create', staff);
    },
    update: (staff) => {
        return axiosClient.patch('/staff/update', staff);
    },
    delete: (staffId) => {
        return axiosClient.delete('/staff/delete', staffId);
    },
    deleteAll: (staffIds) => {
        return axiosClient.post('/staff/delete-all', { staffIds });
    },
    getAll: () => {
        return axiosClient.get('/staff/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/staff/get/${id}`);
    }

};
export default StaffService;
