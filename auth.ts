import NextAuth, { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';
import { GraphQLClient, gql } from 'graphql-request';
import { iSessionData } from './models/entity.models';

const client = new GraphQLClient(
  process.env.HYGRAPH_URL ? process.env.HYGRAPH_URL : '',
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
  },
);

export type sessionType = {
  user: {
    name?: string;
    email: string;
  };
  expires: string;
};

export type tokenType = {
  sub: string;
  user: User;
  id: string;
  iat: number;
  exp: number;
  jti: string;
};

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: userModel(where: { email: $email }, stage: DRAFT) {
      id
      password
      role
      isChild
      agreedTerms
      setPasswd
      personalData {
        id
        idType
        lastName
        motherFamilyName
        secondName
        firstName
        birthDay
        idNumber
        bio
        phone
      }
      karateData {
        id
        cinturon
        dan
        kyu
      }
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createUserModel(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export const config = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jamie@hygraph.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async (
        credentials: Partial<Record<'email' | 'password', unknown>>,
        req: Request,
      ): Promise<User | null> => {
        const { user } = await client.request<Promise<{ user: any }>>(
          GetUserByEmail,
          {
            email: credentials.email,
          },
        );

        if (!user && typeof credentials.password === 'string') {
          const { newUser } = await client.request<Promise<iSessionData | any>>(
            CreateNextUserByEmail,
            {
              email: credentials.email,
              password: await hash(credentials.password, 12),
            },
          );

          return {
            // user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            agreedTerms: newUser.agreedTerms,
            setPasswd: newUser.setPasswd,
            isChild: newUser.isChild,
            personalData: newUser.personalData,
            karateData: newUser.karateData,
            medicalData: newUser.medicalData,
            // },
          };
        }

        const isValid =
          credentials.password && typeof credentials.password === 'string'
            ? await compare(credentials.password, user.password)
            : false;

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          // user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isChild: user.isChild,
          agreedTerms: user.agreedTerms,
          setPasswd: user.setPasswd,
          personalData: user.personalData,
          karateData: user.karateData,
          medicalData: user.medicalData,
          // },
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (protectedRoutes.includes(pathname)) {
        return auth !== null;
      }
      return true;
    },
    async session({ session, token }) {
      return { ...session, ...token };
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
  events: {},
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

const protectedRoutes = ['/dashboard', '/profile'];

export const { handlers, auth } = NextAuth(config);
