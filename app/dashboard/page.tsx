import { isUserAuthenticated } from '@/services/auth.service';
import React from 'react';

const Dashboard = async () => {
    const user = await isUserAuthenticated(true);
    return <div>Dashboard</div>;
};

export default Dashboard;
