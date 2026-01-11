// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const tran_id = searchParams.get("tran_id");

//   if (!tran_id) {
//     return NextResponse.redirect(new URL("/payment/failed", req.url));
//   }

//   return NextResponse.redirect(
//     new URL(`/payment/success?tran_id=${tran_id}`, req.url)
//   );
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const tran_id = searchParams.get("tran_id");
//   // const status = searchParams.get('status'); // SSL Commerz sends status

//   if (!tran_id) {
//     return NextResponse.redirect(new URL("/payment/failed", req.url));
//   }

//   return NextResponse.redirect(
//     new URL(`/payment/success?tran_id=${tran_id}`, req.url)
//   );
// }

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get('tran_id');

  if (!tran_id) {
    const failHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=/payment/failed">
        </head>
        <body>
          <p>Redirecting...</p>
        </body>
      </html>
    `;
    return new NextResponse(failHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const successHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=/payment/success?tran_id=${tran_id}">
      </head>
      <body>
        <p>Payment successful! Redirecting...</p>
      </body>
    </html>
  `;

  return new NextResponse(successHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}

export async function POST(req: Request) {
  // For POST requests, return the same HTML redirect
  const { searchParams } = new URL(req.url);
  const tran_id = searchParams.get('tran_id');

  if (!tran_id) {
    const failHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=/payment/failed">
        </head>
        <body>
          <p>Redirecting...</p>
        </body>
      </html>
    `;
    return new NextResponse(failHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const successHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=/payment/success?tran_id=${tran_id}">
      </head>
      <body>
        <p>Payment successful! Redirecting...</p>
      </body>
    </html>
  `;

  return new NextResponse(successHtml, {
    headers: { 'Content-Type': 'text/html' },
  });
}
