import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  const unactivatedMessage = (
    <div className="max-w-[600px]">
      <p>
        Actualmente tu cuenta se ecnuentra inactiva, en cuanto se active podrás
        acceder a todas las funcionalidades de la plataforma.
      </p>
    </div>
  );

  return (
    <div className="p-[2rem] min-w-[100%] flex flex-col">
      <h1 className="text-6xl mb-[2rem] font-thin mr-auto">
        Hola {session && session?.personalData?.firstName}
      </h1>
      {session && !session?.activated && unactivatedMessage}
    </div>
  );
};

export default Dashboard;
