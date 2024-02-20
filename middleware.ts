import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    const { supabase, response } = createClient(req);
    let {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        if (!session.user.user_metadata.agreedTerms) {
            if (cookies().get('agreedTerms')) {
                await supabase.auth.refreshSession();
            } else {
                return NextResponse.rewrite(new URL('/terms', req.url));
            }
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
