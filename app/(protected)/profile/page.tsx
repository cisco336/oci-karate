import { checkSessionIsValid } from '@/services/auth.service';
import { redirect } from 'next/navigation';
import React from 'react';
import { iUserData } from '@/models/entity.models';

const Profile = async () => {
    const session = await checkSessionIsValid();
    if (!session) {
        return redirect('/');
    }
    const data: iUserData | undefined = await prisma?.userData.findFirstOrThrow(
        {
            where: { userId: session.user.id },
        }
    );
    console.log(data);
    const saveChanges = () => {};
    return (
        <>
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <div className="flex flex-col gap-1">
                    <label
                        className="text-md"
                        htmlFor="first_name">
                        Nombre
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
                        type="first_name"
                        name="first_name"
                        placeholder={data?.firstName || ''}
                        value={data?.firstName || ''}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-md"
                        htmlFor="last_name">
                        Apellido
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
                        type="last_name"
                        name="last_name"
                        placeholder={data?.lastName || ''}
                        value={data?.lastName || ''}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-md"
                        htmlFor="last_name">
                        Sobre mi
                    </label>
                    <textarea
                        className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
                        name="last_name"
                        placeholder={data?.bio || ''}
                        value={data?.bio || ''}
                    />
                </div>
                <div className="flex gap-2 items-stretch">
                    <button className="bg-green-700 rounded-md px-4 py-2 text-foreground flex-1">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </>
    );
};

export default Profile;
