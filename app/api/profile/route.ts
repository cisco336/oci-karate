import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/prisma/prisma.client';
import { NextResponse, NextRequest } from 'next/server';
import { iUserData } from '@/models/entity.models';

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
export async function POST(req: NextRequest) {
    try {
        const supabase = await createServerComponentClient({ cookies });
        const {
            data: { session },
        } = await supabase.auth.getSession();
        const data = await req.json();
        const query = await prisma.userData.update({
            where: { userId: session?.user.id },
            data: {
                ...data,
            },
        });
        return NextResponse.json(query);
    } catch (e) {
        return NextResponse.json(e);
    }
}
