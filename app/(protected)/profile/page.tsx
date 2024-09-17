import React from 'react';
import Profile from './Profile';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ImProfile } from 'react-icons/im';

const ProfilePage = async () => {
  const profile = await auth();

  if (!profile) {
    return redirect('/');
  }

  console.log(profile);
  return (
    <div className="flex flex-col py-8 px-2 w-full max-w-[1200px]">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-thin">Perfil de usuario</h1>
        <ImProfile size={'64'} />
      </div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
