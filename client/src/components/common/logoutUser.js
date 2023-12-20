function logOutUser({ error, authDispatch, navigate }) {
    if (error.response.status == 401) {
        authDispatch({ type: 'LOGOUT' });
      return  navigate('/portal/login');

        
    }
}

export default logOutUser;
