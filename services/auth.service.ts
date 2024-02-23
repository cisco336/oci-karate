import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const checkSessionIsValid = async (): Promise<any | null> => {
    `use server`;
    return new Promise((res: any, rej: any) => res(true));
};

export const userAcceptedTerms = async (
    agreedTerms: boolean
): Promise<any | null> => {
    `use server`;
    return new Promise((res: any, rej: any) => res(true));
};

export const signOut = async (option?: any) => {
    return new Promise((res: any, rej: any) => res(true));
};
