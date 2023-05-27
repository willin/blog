import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  return NextResponse.json({ username: session?.user?.username });
}
