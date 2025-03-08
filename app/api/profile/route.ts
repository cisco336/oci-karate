import { NextResponse, NextRequest } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { UpsertUserProfile } from '@/services/mutations/upsertUserProfile';

// To handle a GET request to /api
// export async function GET(request: Request) {
//     console.log(request);
// }

const client = new GraphQLClient(
  process.env.HYGRAPH_URL ? process.env.HYGRAPH_URL : '',
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_PAT_TOKEN}`,
    },
  },
);

// To handle a POST request to /api
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const query = await client.request<Promise<{} | any>>(
      UpsertUserProfile,
      {
        userId: data.id,
        karateId: data.karateId ?? data.id,
        personalDataId: data.personalDataId ?? data.id,
        medicalDataId: data.medicalDataId ?? data.id,
        cinturon: data.cinturon,
        dan: data.dan,
        kyu: data.kyu,
        idNumber: data.idNumber,
        idType: data.idType,
        birthDay: data.birthDay,
        phone: data.phone,
        names: data.names,
        lastNames: data.lastNames,
        bloodType: data.bloodType,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        eps: data.eps,
        prepaidMedicine: data.prepaidMedicine,
        specialConditions: data.specialConditions,
      },
      {
        ...req.headers,
      },
    );
    console.log('success: ', query);
    return NextResponse.json(query);
  } catch (e) {
    console.log('error: ', e);
    return NextResponse.json(e);
  }
}
