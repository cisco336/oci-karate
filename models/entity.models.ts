import { BeltColors, Role, kyuDan } from '@prisma/client';

interface iSession {
    provider_token?: string | null | undefined;
    provider_refresh_token?: string | null | undefined;
    access_token?: string | undefined;
    refresh_token?: string | undefined;
    expires_in?: number | undefined;
    expires_at?: number | undefined;
    token_type?: string | undefined;
    user?: User | undefined;
}

interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmed_at: string;
    last_sign_in_at: string;
    app_metadata: Appmetadata;
    user_metadata: Usermetadata;
    identities: iIdentity[];
    created_at: string;
    updated_at: string;
}

interface Usermetadata {
    agreedTerms: boolean;
    firstName: string;
    isChild: boolean;
    lastName: string;
    phone: string;
    setPasswd: boolean;
}

interface Appmetadata {
    provider: string;
    providers: any[];
}

interface iIdentity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: Identitydata;
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
    email: string;
}

interface Identitydata {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
}

export interface iUserData {
    id?: number | null;
    bio?: string | null;
    userId?: string | null;
    birthDate?: Date | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    belt?: BeltColors | null;
    degree?: string[] | null;
    children?: any[] | null;
    medicalData?: any[] | null;
    agreedTerms?: boolean;
    setPasswd?: boolean;
    isChild?: boolean;
    parents?: any[] | null;
    kyu?: kyuDan | null;
    dan?: kyuDan | null;
    role?: Role | null;
}
