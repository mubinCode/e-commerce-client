import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const publicPaths = [
    "/login",
    "/register",
    "/order-confirmation",
  ];

  const isPublic = publicPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api).*)"],
};
