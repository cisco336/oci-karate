import { handlers } from '@/auth';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// export const { GET, POST } = handlers;
const { GET: AuthGET, POST } = handlers;
export { POST };

// Showcasing advanced initialization in Route Handlers
export async function GET(request: NextRequest) {
    const response = await AuthGET(request);
    return response;
}
