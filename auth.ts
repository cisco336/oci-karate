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
      activated
    }
  }
`;

export const config = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 10,
    updateAge: 60 * 10,
  },
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
        const response = await client.request<Promise<{ user: any }>>(
          GetUserByEmail,
          {
            email: credentials.email,
          },
        );

        const { user } = response;

        console.log('RESPONSE AUTH: ', response);

        if (!user && typeof credentials.password === 'string') {
          throw new Error('Wrong credentials. Try again.');
          // const { newUser } = await client.request<Promise<iSessionData | any>>(
          //   CreateNextUserByEmail,
          //   {
          //     email: credentials.email,
          //     password: await hash(credentials.password, 12),
          //   },
          // );

          // console.log('newUser', newUser);

          // return {
          //   id: newUser.id,
          //   user: {
          //     activated: newUser.activated,
          //     email: newUser.email,
          //     role: newUser.role,
          //     agreedTerms: newUser.agreedTerms,
          //     setPasswd: newUser.setPasswd,
          //     isChild: newUser.isChild,
          //     personalData: newUser.personalData,
          //     karateData: newUser.karateData,
          //     medicalData: newUser.medicalData,
          //   },
          // };
        }

        const isValid =
          credentials.password && typeof credentials.password === 'string'
            ? await compare(credentials.password, user.password)
            : false;

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          user: {
            activated: user.activated,
            email: user.email,
            role: user.role,
            agreedTerms: user.agreedTerms,
            setPasswd: user.setPasswd,
            isChild: user.isChild,
            personalData: user.personalData,
            karateData: user.karateData,
            medicalData: user.medicalData,
          },
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
