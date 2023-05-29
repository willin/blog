import { getInvoices } from '@/lib/metrics';
import { NextResponse } from 'next/server';

export async function GET() {
  const invoices = await getInvoices();
  return NextResponse.json(invoices);
}

export const revalidate = 3600;
export const runtime = 'edge';
