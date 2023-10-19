import { adminAxios } from '../../../../../../api/axios';
import { useNewProduct } from '../../../../../../context/newProductContext';
import formatFormData from './formatFormData';

export default function publishData(formData) {


    try {
        adminAxios({
            method: 'post',
            url: '/product/create',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (error) {
        const errorData = error.response.data;
        console.log('error', errorData);
        
        setPublishError(errorData);
    }
}
