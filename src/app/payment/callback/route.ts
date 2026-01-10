import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get('tran_id');

  if (!tran_id) {
    return NextResponse.redirect(new URL('/payment/failed', req.url));
  }

  return NextResponse.redirect(
    new URL(`/payment/success?tran_id=${tran_id}`, req.url)
  );
}

export async function GET() {

  return NextResponse.next();
}
