import React from 'react';
import { ImProfile } from 'react-icons/im';
import Profile from './Profile';

const ProfilePage = async () => {
  return (
    <div className="flex flex-col py-8 px-2 w-full max-w-[800px]">
      <h2 className="text-6xl font-thin flex items-center gap-2">
        <ImProfile size={'32'} />
        Perfil de usuario
      </h2>
      <Profile />
    </div>
  );
};

export default ProfilePage;
