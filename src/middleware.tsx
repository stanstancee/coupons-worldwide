import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const isOnboarded = (await cookies()).get("isOnboarded")?.value;
  const accountType = (await cookies()).get("accountType")?.value;
  if (
    !token ||
    ((!isOnboarded || isOnboarded === "false") && accountType !== "team")
  ) {
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${request.nextUrl.pathname}`, request.url)
    );
  }
}


// !!TODO: Update matcher
export const config = {
  matcher: ["/dashboard/:path*"],
};
