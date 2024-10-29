import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  // console.log(path);

  const isPublicPath =
    path === "/admin_login" || path === "/";

  const token = request.cookies.get("authToken")?.value || "";

//   console.log(token);
  

  // const sessionToken = cookieStoreOfProvider.get('next-auth.session-token')?.value;
  // const tokend = request.cookies.get('next-auth.session-token')?.value;

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/admin_login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin_login",
    "/admin_dashboard/:path*",
    // "/admin_only"
  ],
};
