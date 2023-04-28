import axiosClient from './base';

const PropertiesService = {
    getAll: () => {
        return axiosClient.get('/properties/get-all');
    }

};
export default PropertiesService;
