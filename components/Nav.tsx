import React from 'react';
import AuthButton from './AuthButton';
import Link from 'next/link';
import { Button, buttonColor } from './shared/Button';
import { auth } from '@/auth';

const Nav = async () => {
    const session = await auth();

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-[1200px] flex justify-between items-center p-3 text-sm">
                <div className="flex gap-2 justify-start items-center">
                    <span>Logo y nombre</span>
                    <Link href={'/'}>
                        <Button color={buttonColor.Text}>Inicio</Button>
                    </Link>
                    {session && (
                        <Link href={'/dashboard'}>
                            <Button color={buttonColor.Text}>My panel</Button>
                        </Link>
                    )}
                </div>
                <AuthButton />
            </div>
        </nav>
    );
};

export default Nav;
