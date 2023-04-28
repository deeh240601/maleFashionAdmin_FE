import axiosClient from './base';

const CategoryService = {
    create: (category) => {
        return axiosClient.post('/category/create', category);
    },
    update: (category) => {
        console.log(category);
        return axiosClient.patch('/category/update', category);
    },
    delete: (categoryId) => {
        return axiosClient.delete('/category/delete', categoryId);
    },
    deleteAll: (categoryIds) => {
        return axiosClient.post('/category/delete-all', { categoryIds });
    },
    getAll: () => {
        return axiosClient.get('/category/get-all');
    },
    getById: (id) => {
        return axiosClient.get(`/category/get/${id}`);
    }

};
export default CategoryService;
