import { checkSessionIsValid } from '@/services/auth.service';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
    const session = await checkSessionIsValid();

    if (!session) {
        return redirect('/');
    }
    return (
        <div className="p-[2rem] min-w-[100%] flex">
            <h1 className="text-6xl mb-[2rem] font-thin mr-auto">
                Hola {session && session?.user?.user_metadata?.firstName}
            </h1>
        </div>
    );
};

export default Dashboard;
