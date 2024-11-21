import type { Session } from "@/lib/auth-types";
import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const authPages = ["/sign-in", "/sign-up"];
  const isAuthPage = authPages.includes(request.nextUrl.pathname);
  const privatePages = [
    "/dashboard",
    "/user-profile",
    "/dashboard/appointment",
  ];
  const isPrivatePage = privatePages.includes(request.nextUrl.pathname);

  // If user is not logged in and tries to access any protected route
  // if (!session) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  // If logged-in user tries to access login/signup pages
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If non-logged-in user tries to access dashboard
  if (isPrivatePage && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user-profile", "/sign-in", "/sign-up"],
};
