import CheckBox from '@/components/CheckBox';
import React from 'react';
import {
    checkSessionIsValid,
    userAcceptedTerms,
} from '@/services/auth.service';
import prisma from '../../../prisma/prisma.client';
import { redirect } from 'next/navigation';
import { Button, buttonColor, buttonTypes } from '@/components/shared/Button';

const Terms = async () => {
    let accepted = false;
    const lorem = (
        <>
            <p className="mb-[10px]">
                Elit amet id occaecat dolor sit incididunt est mollit. Cupidatat
                irure anim ipsum consequat mollit ad duis duis velit esse enim
                Lorem eiusmod culpa. Aliquip elit proident ad id irure ipsum.
                Nisi elit cupidatat enim labore ipsum cillum eu aliqua. Ut et
                laborum irure in. Mollit ea ad commodo eiusmod dolor. Nulla sint
                ex consectetur velit aute amet culpa laboris esse elit laborum
                eiusmod mollit sint. Deserunt eu ex non aliqua excepteur sunt.
            </p>
            <p className="mb-[10px] ">
                Velit laborum ex mollit officia veniam Lorem laboris est eu.
                Eiusmod sit duis qui mollit nisi quis laborum labore. Elit
                officia culpa amet ea Lorem occaecat in aliqua id adipisicing.
                Deserunt ad laboris nulla et occaecat incididunt est labore in
                nulla fugiat culpa. Laboris et minim dolor sunt tempor consequat
                magna est amet magna consequat labore. Officia ea amet in
                voluptate deserunt cupidatat in officia Lorem labore minim
                excepteur eu do. Magna occaecat consequat velit sint consequat
                adipisicing mollit consectetur labore laboris adipisicing.
            </p>
        </>
    );
    const session = await checkSessionIsValid();
    const acceptHandler = async (formData: FormData) => {
        'use server';
        const accept = formData.get('aceptar');
        if (session && accept && session?.user?.id) {
            await prisma.userData.update({
                where: { userId: session?.user?.id },
                data: {
                    agreedTerms: true,
                },
            });
            await userAcceptedTerms(true);
            return redirect('/dashboard');
        }
    };
    return (
        <form
            className="animate-in p-[2rem]"
            action={acceptHandler}>
            <h1 className="text-6xl mb-[2rem] font-thin mr-auto">Terms</h1>
            <div className="pb-[1rem]">
                {[1, 2, 3, 4, 5].map((e: any) => (
                    <span key={e}>{lorem}</span>
                ))}
            </div>
            <CheckBox
                checked={accepted}
                name="aceptar"
                title="Acepto los terminos"
            />
            <div className="flex gap-2 min-w-[100%] justify-end pt-[1rem]">
                <Button color={buttonColor.Text}>Cancelar</Button>
                <Button
                    buttonType={buttonTypes.Submit}
                    type={buttonColor.Primary}>
                    Continuar
                </Button>
            </div>
        </form>
    );
};

export default Terms;
