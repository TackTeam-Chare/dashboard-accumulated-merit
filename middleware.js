import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "https://dashboard-accumulation.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }

  return response;
}
