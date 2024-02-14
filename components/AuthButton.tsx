import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Button from './Button';
import { basicTypes } from '@/constants/enums';
import { isUserAuthenticated } from '@/services/auth.service';
import { iUser } from '@/models/entity.models';

export default async function AuthButton() {
    const user: iUser = await isUserAuthenticated(true);

    const signOut = async () => {
        'use server';

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect('/login');
    };

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user?.data?.firstName} {user?.data?.lastName}
            <form action={signOut}>
                <Button type={basicTypes.Text}>Cerrar sesión</Button>
            </form>
        </div>
    ) : (
        <div className="flex row-auto items-center justify-end gap-2">
            <Link href="/login">
                <Button type={basicTypes.Text}>Iniciar sesión</Button>
            </Link>
            {/* <SignUpRedirectButton /> */}
        </div>
    );
}
