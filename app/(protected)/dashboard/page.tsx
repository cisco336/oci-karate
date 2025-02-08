import { auth } from '@/auth';
import { TermsAgreement } from '@/components/TermsAgreement/TermsAgreement';
import { redirect } from 'next/navigation';
import React from 'react';
import { createPortal } from 'react-dom';

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  console.log('DASHBOARD', { ...session });

  return (
    <div className="p-[2rem] min-w-[100%] flex">
      <h1 className="text-6xl mb-[2rem] font-thin mr-auto">
        Hola {session && session?.user?.personalData?.firstName}
      </h1>
      {/* <TermsAgreement /> */}
    </div>
  );
};

export default Dashboard;
