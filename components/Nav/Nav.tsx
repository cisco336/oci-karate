import React from 'react';
import AuthButton from '../AuthButton';
import Link from 'next/link';
import { Button, buttonColor, buttonVariants } from '../shared/Button';
import { auth } from '@/auth';

import { FaToriiGate } from 'react-icons/fa';

const Nav = async () => {
    const session = await auth();

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-[1200px] flex justify-between items-center p-3 text-sm">
                <div className="flex gap-2 justify-start items-center">
                    <Link href={'/'}>
                        <Button
                            variant={buttonVariants.Ghost}
                            color={buttonColor.Primary}>
                            <FaToriiGate color={'#FF8080'} />
                        </Button>
                    </Link>
                    {/* {session && (
                        <Link href={'/dashboard'}>
                            <Button color={buttonColor.Text}>My panel</Button>
                        </Link>
                    )} */}
                </div>
                {/* <AuthButton /> */}
            </div>
        </nav>
    );
};

export default Nav;