import axiosClient from './base';

const UserService = {
    getAll: () => {
        return axiosClient.get('/user/get-all');
    },
    getAll2: () => {
        return axiosClient.get('/user/get-all-2');
    },

    getById: (id) => {
        return axiosClient.get(`/user/get/${id}`);
    }

};
export default UserService;
