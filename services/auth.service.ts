import { iUser } from '@/models/entity.models';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect as redirecting } from 'next/navigation';

export const isUserAuthenticated = async (
    redirect?: boolean
): Promise<iUser> => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    let userWithData = { main: { ...user }, data: {} };
    if (user && user.aud === 'authenticated' && user.id) {
        const userData = await prisma.userData.findFirstOrThrow({
            where: { userId: user.id },
        });
        userWithData.data = { ...userData };
    } else {
        if (redirect) {
            // return redirecting('/');
        }
    }
    return userWithData;
};
