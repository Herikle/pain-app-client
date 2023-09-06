import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const redirect_paths = ["/hens", "/broilers", "/broilers/stunning"];

export function middleware(req: NextRequest) {
  const request_path = req.nextUrl.pathname;

  const index = redirect_paths.indexOf(request_path);

  const is_redirect_path = index > -1;

  if (is_redirect_path) {
    const redirect_path = redirect_paths[index];
    return NextResponse.redirect(`https://cp.pain-track.org${redirect_path}`);
  }

  return NextResponse.next();
}
