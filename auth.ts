import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcrypt';
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(
    process.env.HYGRAPH_URL ? process.env.HYGRAPH_URL : '',
    {
        headers: {
            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
        },
    }
);

const GetUserByEmail = gql`
    query GetUserByEmail($email: String!) {
        user: userModel(where: { email: $email }, stage: DRAFT) {
            id
            password
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
            authorize: async (credentials, req): Promise<{} | null> => {
                const { user } = await client.request<Promise<{ user: any }>>(
                    GetUserByEmail,
                    {
                        email: credentials.email,
                    }
                );

                if (!user && typeof credentials.password === 'string') {
                    const { newUser } = await client.request<Promise<{} | any>>(
                        CreateNextUserByEmail,
                        {
                            email: credentials.email,
                            password: await hash(credentials.password, 12),
                        }
                    );

                    return {
                        id: newUser.id,
                        username: credentials.email,
                        email: credentials.email,
                    };
                }

                const isValid =
                    credentials.password &&
                    typeof credentials.password === 'string'
                        ? await compare(credentials.password, user.password)
                        : false;

                if (!isValid) {
                    throw new Error('Wrong credentials. Try again.');
                }

                return {
                    id: user.id,
                    username: credentials.email,
                    email: credentials.email,
                };
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            console.log('authorized');
            const { pathname } = request.nextUrl;
            if (pathname === '/middleware-example') return !!auth;
            return true;
        },
    },
    pages: {
        signIn: '/login',
    },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
