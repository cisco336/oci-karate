import NextAuth, { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';
import { GraphQLClient, gql } from 'graphql-request';

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
  mutation CreateNextUserByEmail(
    $email: String!
    $password: String!
    $firstName: String!
    $secondName: String!
    $lastName: String!
    $motherFamilyName: String!
  ) {
    user: createUserModel(
      data: {
        email: $email
        password: $password
        personalData: {
          create: {
            firstName: $firstName
            lastName: $lastName
            secondName: $secondName
            motherFamilyName: $motherFamilyName
          }
        }
      }
    ) {
      id
      email
      activated
      personalData {
        firstName
        secondName
        lastName
        motherFamilyName
      }
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
        credentials: Partial<
          Record<
            | 'email'
            | 'password'
            | 'firstName'
            | 'secondName'
            | 'lastName'
            | 'motherFamilyName',
            unknown
          >
        >,
        req: Request,
      ): Promise<User | null> => {
        const response =
          !credentials.firstName || credentials.firstName === ''
            ? await client.request<Promise<{ user: any }>>(
                GetUserByEmail,
                {
                  email: credentials.email,
                },
                {
                  Authorization: `Bearer ${process.env.HYGRAPH_PAT_TOKEN}`,
                },
              )
            : await client.request<Promise<{ user: any }>>(
                CreateNextUserByEmail,
                {
                  email: credentials.email,
                  password: await hash(credentials.password as string, 12),
                  firstName: credentials.firstName,
                  secondName: credentials.secondName,
                  lastName: credentials.lastName,
                  motherFamilyName: credentials.motherFamilyName,
                },
                {
                  Authorization: `Bearer ${process.env.HYGRAPH_PAT_TOKEN}`,
                },
              );

        const { user } = response;

        if (!credentials.firstName || credentials.firstName === '') {
          const isValid =
            credentials.password && typeof credentials.password === 'string'
              ? await compare(credentials.password, user.password)
              : false;

          if (!isValid) {
            throw new Error('Wrong credentials. Try again.');
          }
        }

        return user;
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
