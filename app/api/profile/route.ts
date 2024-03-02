import { NextResponse, NextRequest } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';

// To handle a GET request to /api
// export async function GET(request: Request) {
//     console.log(request);
// }

const client = new GraphQLClient(
    process.env.HYGRAPH_URL ? process.env.HYGRAPH_URL : '',
    {
        headers: {
            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
        },
    }
);

const UpdateUserData = gql`
    mutation UpdateUserData(
        $id: ID
        $karateId: ID
        $personalDataId: ID
        $role: [Role!]
        $isChild: Boolean
        $setPasswd: Boolean
        $agreedTerms: Boolean
        $bio: String
        $firstName: String
        $lastName: String
        $motherFamilyName: String
        $secondName: String
        $birthDay: Date
        $phone: String
        $idType: IdType!
        $idNumber: String!
        $belt: Cinturon
        $dan: KyuDan
        $kyu: KyuDan
    ) {
        updateUserModel(
            data: {
                role: $role
                isChild: $isChild
                setPasswd: $setPasswd
                agreedTerms: $agreedTerms
                personalData: {
                    upsert: {
                        data: {
                            create: {
                                firstName: $firstName
                                secondName: $secondName
                                lastName: $lastName
                                motherFamilyName: $motherFamilyName
                                birthDay: $birthDay
                                bio: $bio
                                idType: $idType
                                idNumber: $idNumber
                                phone: $phone
                            }
                            update: {
                                firstName: $firstName
                                secondName: $secondName
                                lastName: $lastName
                                motherFamilyName: $motherFamilyName
                                birthDay: $birthDay
                                bio: $bio
                                idType: $idType
                                idNumber: $idNumber
                                phone: $phone
                            }
                        }
                        where: { id: $personalDataId }
                    }
                }
                karateData: {
                    upsert: {
                        data: {
                            create: { cinturon: $belt, dan: $dan, kyu: $kyu }
                            update: { cinturon: $belt, dan: $dan, kyu: $kyu }
                        }
                        where: { id: $karateId }
                    }
                }
            }
            where: { id: $id }
        ) {
            id
        }
    }
`;

// To handle a POST request to /api
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const query = await client.request<Promise<{} | any>>(UpdateUserData, {
            id: data.id,
            bio: data.bio,
            role: [data.role],
            firstName: data.firstName,
            lastName: data.lastName,
            motherFamilyName: data.motherFamilyName,
            phone: data.phone,
            secondName: data.secondName,
            birthDay: new Date(data.birthDay || new Date()),
            idType: data.userNationalIDType,
            idNumber: data.userNationalID,
            belt: data.cinturon,
            dan: data.dan,
            kyu: data.kyu,
            isChild: Boolean(data.isChild),
            setPasswd: Boolean(data.setPasswd),
            agreedTerms: Boolean(data.agreedTerms),
            karateId: data.karateId,
            personalDataId: data.personalDataId,
        });
        return NextResponse.json(query);
    } catch (e) {
        return NextResponse.json(e);
    }
}
