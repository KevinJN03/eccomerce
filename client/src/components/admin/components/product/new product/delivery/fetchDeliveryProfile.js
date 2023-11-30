import { adminAxios } from '../../../../../../api/axios';
import { useState, useEffect } from 'react';

export default function fetchProfile(setState) {
    adminAxios
        .get('/delivery/all')
        .then((res) => {
            if (res.status == 200) {
                setState(res.data);
            }
        })
        .catch((error) => {
       
        });
}
