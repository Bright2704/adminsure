import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    const AuthComponent = () => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // ใช้ useNavigate ในการนำทางไปยังหน้า login
            }
        }, []);

        return <WrappedComponent />;
    };

    return AuthComponent;
};

export default withAuth;
