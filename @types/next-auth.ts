// types/next-auth.d.ts

import {
  iPersonalData,
  iKarateData,
  iMedicalData,
} from '@/models/entity.models';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  export interface Session {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    id?: string;
    token?: string;
    error?: string;
    user?: User;
    personalData?: iPersonalData | null;
    activated?: boolean;
    agreedTerms?: boolean;
  }

  export interface User {
    names?: string;
    lastNames?: string;
    idType?: string;
    idNumber?: string;
    email?: string | null | undefined;
    id?: string;
    phone?: string;
    birthDay?: string;
    contactAddress?: {
      id?: string;
    };
    personalData?: iPersonalData | null;
    karateData?: iKarateData | null;
    medicalData?: iMedicalData | null;
    isChild: boolean;
    agreedTerms?: boolean;
    setPasswd?: boolean;
    degree?: string[] | null;
    children?: any[] | null;
    parents?: any[] | null;
  }

  export interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
