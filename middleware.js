import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_FRONTEND_URL || "*" );
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }

  return response;
}
