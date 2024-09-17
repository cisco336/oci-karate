import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { signOut as signinOut } from 'next-auth/react';

export const checkSessionIsValid = async (): Promise<any | null> => {
  `use server`;
  return new Promise((res: any, rej: any) => res(true));
};

export const userAcceptedTerms = async (
  agreedTerms: boolean,
): Promise<any | null> => {
  `use server`;
  return new Promise((res: any, rej: any) => res(true));
};
