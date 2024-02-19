export interface iUser {
    main?: iUserMain;
    data?: iUserData;
}

export interface iUserMain {
    id?: string;
    aud?: string;
    role?: string;
    email?: string;
    email_confirmed_at?: string;
    phone?: string;
    confirmation_sent_at?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata?: Appmetadata | null;
    user_metadata?: Usermetadata | null;
    identities?: any[];
    created_at?: string;
    updated_at?: string;
}

export interface iUserData {
    id?: number;
    bio?: any;
    userId?: string;
    birthDate?: any;
    firstName?: string;
    lastName?: string;
    degree?: any[];
    children?: any[];
    medicalData?: any[];
    agreedTerms?: boolean;
    setPasswd?: boolean;
    isChild?: boolean;
    parents?: any[];
    kyuDataId?: any;
    danDataId?: any;
}

interface Usermetadata {
    provider?: string;
    providers?: any[];
}

interface Appmetadata {
    provider?: string;
    providers?: string[];
}
