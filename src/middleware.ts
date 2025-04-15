import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocale } from "./utils/host";
import { urlApi } from "./constants/url_api";

export async function middleware(request: NextRequest) {
  const header = (await headers()).get("host");
  const locale = getLocale(header as string);

  if (!urlApi[locale])
    return NextResponse.rewrite(new URL("/not-found", request.url));

  return NextResponse.next();
}
