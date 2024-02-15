import { iUser } from '@/models/entity.models';
import { isUserAuthenticated } from '@/services/auth.service';
import React from 'react';

const Dashboard = async () => {
    const user: iUser = await isUserAuthenticated(true);
    return (
        <>
            <div>Hola {user && user?.data?.firstName}</div>
        </>
    );
};

export default Dashboard;
