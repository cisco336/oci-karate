import { BeltColors, IdType, Role, kyuDan } from '@prisma/client';

export interface iSession {
  data: iSessionData | null;
  status: string;
}

export interface iSessionData {
  user?: iBasicUser;
  expires?: string;
  id: string;
  username?: string;
  email?: string;
  role: Role[];
  isChild: boolean;
  agreedTerms?: boolean;
  setPasswd?: boolean;
  degree?: string[] | null;
  children?: any[] | null;
  parents?: any[] | null;
  personalData: iPersonalData | null;
  karateData: iKarateData | null;
  medicalData: iMedicalData | null;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface iKarateData {
  id?: string;
  cinturon?: BeltColors;
  dan: kyuDan;
  kyu: kyuDan;
}

export interface iPersonalData {
  id: string;
  idType: IdType;
  lastName: string;
  motherFamilyName?: any;
  bio?: string;
  secondName?: any;
  firstName: string;
  birthDay: string;
  idNumber: string;
  phone?: string;
}

export interface iMedicalData {
  id?: string;
  blodType?: string;
  eps?: string;
  prepaidMedicine?: string;
  specialConditions?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface iBasicUser {
  id?: string;
  email?: string;
}
