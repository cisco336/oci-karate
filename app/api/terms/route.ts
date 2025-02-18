import { getData, mutateData } from '@/services/hygraph.service';
import { AcceptTerms } from '@/services/mutations';
import { getSingleArticleBySlug } from '@/services/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const terms = await getData(getSingleArticleBySlug, {
    slug: 'article-terms-and-conditions-for-dojo',
  });
  return NextResponse.json(terms);
}

export async function POST(req: NextRequest) {
  const id = await req.json();
  const response = await mutateData(AcceptTerms, { id });
  return NextResponse.json(response);
}
