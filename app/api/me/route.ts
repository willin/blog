import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const username: string = session?.user?.username || '';
  // TODO: TBD
  const vip = ['willin'].includes(username);
  return NextResponse.json({ username, vip });
}
