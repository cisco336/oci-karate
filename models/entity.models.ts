export interface iUser {
    main?: userMain;
    data?: userData;
}

interface userMain {
    id?: string;
    aud?: string;
    role?: string;
    email?: string;
    email_confirmed_at?: string;
    phone?: string;
    confirmation_sent_at?: string;
    confirmed_at?: string;
    last_sign_in_at?: string;
    app_metadata?: Appmetadata | {};
    user_metadata?: Usermetadata | {};
    identities?: any[];
    created_at?: string;
    updated_at?: string;
}

interface userData {
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

interface Usermetadata {}

interface Appmetadata {
    provider: string;
    providers: any[];
}
