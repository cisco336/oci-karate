import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/prisma/prisma.client';

// To handle a GET request to /api
export async function GET(request: Request) {
    const supabase = await createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const userData = await prisma.userData.findFirst({
        where: { userId: session?.user.id },
    });
    return Response.json({ userData, session }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: Request) {
    // Do whatever you want
    return Response.json({ body: request.body }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
