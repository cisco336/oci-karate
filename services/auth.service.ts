import { iUser, iUserData } from '@/models/entity.models';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import prisma from '../prisma/prisma.client';
import {
    Session,
    createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

export const isUserAuthenticated = async (): Promise<void> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    let data = { main: { ...user }, data: {} };
    if (user && user.aud === 'authenticated' && user.id) {
        prisma.userData
            .findFirstOrThrow({
                where: { userId: user.id },
            })
            .then((res: iUserData) => {
                data.data = { ...res };
            })
            .catch((e: any) => {
                console.log('Error: ', e);
            });
    }
    userWithData = data;
};

let userWithData: iUser | null = null;

export const getUser = async (): Promise<iUser | null> => {
    userWithData ?? (await isUserAuthenticated());

    return userWithData;
};

export const checkSessionIsValid = async (): Promise<Session | null> => {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
};
