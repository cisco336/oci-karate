'use client';
import { signIn } from 'next-auth/react';
import BackButton from '@/components/BackButton';

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const submit = async (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const result = await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/',
        });
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 animate-fade-in">
            <div className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <form
                    action={submit}
                    className="animate-in flex flex-col w-full justify-center gap-2 text-foreground mb-8">
                    <label
                        className="text-md"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        placeholder="you@example.com"
                        required
                    />
                    <label
                        className="text-md"
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <div className="flex gap-2 items-stretch">
                        {/* <BackButton /> */}
                        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground flex-1">
                            Sign In
                        </button>
                    </div>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
