import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import {
    Session,
    createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { AuthResponse, SignOut, UserResponse } from '@supabase/supabase-js';

export const checkSessionIsValid = async (): Promise<Session | null> => {
    `use server`;
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
};

export const userAcceptedTerms = async (
    agreedTerms: boolean
): Promise<AuthResponse | null> => {
    `use server`;
    const supabase = createServerComponentClient({ cookies });
    cookies().set('agreedTerms', 'true', { secure: true });
    await supabase.auth.updateUser({
        data: {
            agreedTerms: agreedTerms,
        },
    });
    return await supabase.auth.refreshSession();
};

export const signOut = async (option?: SignOut) => {
    `use server`;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut(option);
    return redirect('/login');
};
