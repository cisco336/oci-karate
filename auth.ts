import NextAuth, { Account, NextAuthConfig, Profile, User } from 'next-auth';
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
      activated
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

const userLogin = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const response = await client.request<Promise<{ user: any }>>(
    GetUserByEmail,
    {
      email,
    },
    {
      Authorization: `Bearer ${process.env.HYGRAPH_PAT_TOKEN}`,
    },
  );
  const { user } = response;

  const isValid = password ? await compare(password, user.password) : false;

  if (!isValid) {
    throw new Error('Wrong credentials. Try again.');
  }

  return user;
};

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
            | 'motherFamilyName'
            | 'register',
            unknown
          >
        >,
        req: Request,
      ): Promise<User | null> => {
        // If no register, then we are trying to login
        if (credentials.register === 'false') {
          return await userLogin(
            credentials.email as string,
            credentials.password as string,
          );
        } else {
          // If register, then we are trying to create a new user
          // First check if user exists
          const userExists = await userLogin(
            credentials.email as string,
            credentials.password as string,
          );

          // If user exists, then throw an error
          if (userExists) {
            return { error: 'User already exists' } as any;
          }

          // If user does not exist, then create user
          const response = await client.request<Promise<{ user: any }>>(
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

          const { user: newUser } = response;

          return newUser;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      if (credentials?.register === 'true') {
        throw new Error((user as unknown as { error: string }).error);
      }

      return true;
    },
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
