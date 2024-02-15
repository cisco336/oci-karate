import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Button from './Button';
import { basicTypes } from '@/constants/enums';
import { isUserAuthenticated } from '@/services/auth.service';
import { iUser } from '@/models/entity.models';
import DropDown from './DropDown';

export default async function AuthButton() {
    const user: iUser = await isUserAuthenticated(true);

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
            label={`Hola ${user.data?.firstName}`}>
            <form action={signOut}>
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

    return user?.main?.id ? dropdown : login;

    // return user?.main?.id ? (
    //     <div className="flex items-center gap-4">
    //         Hey, {user?.data?.firstName} {user?.data?.lastName}
    //         <Button
    //             callback={signOut}
    //             type={basicTypes.Text}>
    //             Cerrar sesión
    //         </Button>
    //     </div>
    // ) : (
    //     <div className="flex row-auto items-center justify-end gap-2">
    //         <Link href="/login">
    //             <Button type={basicTypes.Text}>Iniciar sesión</Button>
    //         </Link>
    //         {/* <SignUpRedirectButton /> */}
    //     </div>
    // );
}
