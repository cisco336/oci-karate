import { checkSessionIsValid, getUser } from '@/services/auth.service';
import { redirect } from 'next/navigation';
import React from 'react';

const Profile = async () => {
    const session = await checkSessionIsValid();
    const user = await getUser();
    if (!session) {
        return redirect('/');
    }
    console.log(user);
    return <div>Profile</div>;
};

export default Profile;
