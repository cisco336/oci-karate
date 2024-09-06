import BackButton from '@/components/BackButton';
import { PrismaClient } from '@prisma/client';
import { headers, cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const phone = formData.get('phone') as string;
    const cookieStore = cookies();

    // const { error, data: signUpData } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //         emailRedirectTo: `${origin}/auth/callback`,
    //         data: {
    //             firstName: first_name,
    //             lastName: last_name,
    //             agreedTerms: false,
    //             setPasswd: false,
    //             isChild: false,
    //             phone,
    //         },
    //     },
    // });

    // if (error) {
    //     return redirect('/signup?message=Could not authenticate user');
    // }

    // return redirect(
    //     '/signup?message=Check email to continue sign in process'
    // );
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-lg justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signUp}>
        <div className="flex row-auto gap-2">
          <div className="flex flex-col gap-1">
            <label
              className="text-md"
              htmlFor="first_name">
              First Name
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
              type="first_name"
              name="first_name"
              placeholder="Jhon"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              className="text-md"
              htmlFor="last_name">
              Last Name
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6 w-full"
              type="last_name"
              name="last_name"
              placeholder="Doe"
              required
            />
          </div>
        </div>
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
        <label
          className="text-md"
          htmlFor="phone">
          Phone
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="phone"
          name="phone"
          placeholder="1234567890"
        />
        <div className="flex gap-2 items-stretch">
          <BackButton />
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground flex-1">
            Sign Up
          </button>
        </div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
