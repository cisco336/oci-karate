'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function SignUpRedirectButton() {
  const { push } = useRouter();

  return (
    <button
      onClick={(e) => push('/signup')}
      className="border border-foreground/20 rounded-md px-4 py-2 text-foreground">
      Sign Up
    </button>
  );
}

export default SignUpRedirectButton;
