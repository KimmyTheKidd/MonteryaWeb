import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserAuth } from "./config/AuthContext";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("Request URL:", request.url);

  try {
    const user = UserAuth();
    console.log("User:", user);

    if (user) {
      console.log("User Email:", user.email);
    } else {
      console.log("No user found");
    }

    return NextResponse.redirect(new URL("/home", request.url));
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
