function logOutUser({ error, authDispatch, navigate }) {
    if (error.response.status == 401) {
        authDispatch({ type: 'LOGOUT' });
        navigate('/login');
    }
}

export default logOutUser;
