function logOutUser({ error, authDispatch, navigate }) {
    if (error.response.status == 401) {
        authDispatch({ type: 'LOGOUT' });
        navigate('/portal/login');
    }
}

export default logOutUser;
