import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Button from './Button';
import { basicTypes } from '@/constants/enums';
import { getUser, checkSessionIsValid } from '@/services/auth.service';
import DropDown from './DropDown';

export default async function AuthButton() {
    const user = await getUser();
    const session = await checkSessionIsValid();

    const signOut = async () => {
        'use server';

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect('/login');
    };

    const dropdown = (
        <DropDown
            isOpen={false}
            position={'up'}
            closeOnSelect={false}
            label={`Hola ${user?.data?.firstName}`}>
            <form action={signOut}>
                <Link href="/profile">
                    <Button type={basicTypes.Text}>Mi cuenta</Button>
                </Link>
                <hr />
                <Button
                    buttonType="submit"
                    type={basicTypes.Text}>
                    Cerrar sesión
                </Button>
            </form>
        </DropDown>
    );

    const login = (
        <Link href="/login">
            <Button type={basicTypes.Text}>Iniciar sesión</Button>
        </Link>
    );

    return session ? dropdown : login;
}
