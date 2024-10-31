import axios from "axios";
import { NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

const Api = axios.create({
  baseURL: "https://6969.lat/v1/",
  headers: {
    juliolb: "ad121d1f-3c29-4821-b941-5b6ca383e32e",
  },
});



async function validateToken(token) {
  if (token) {
    Api.defaults.headers.token = token.value;
    try {
      const response = await Api.get("romaneios");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export async function middleware(req) {
  const url = req.nextUrl;
  const path = url.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const validToken = await validateToken(req.cookies.get("token"));

  if (isPublicRoute && validToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (!isPublicRoute && !validToken) {
    return NextResponse.redirect(new URL("/login", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
