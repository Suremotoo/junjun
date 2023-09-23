import { getApis, deleteApi, getApiById, createApi, updateApi } from "@/lib/api-api";
import { NextResponse } from "next/server";

// Handles  requests to /api/apis

export async function POST(request: Request) {
  const formData = await request.json();
  createApi(formData);
  return NextResponse.json({})
}

export async function PUT(request: Request) {
  const formData = await request.json();
  updateApi(formData);
  return NextResponse.json({})
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  deleteApi(id);
  return NextResponse.json({})
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  console.log("id", id);
  if (id) {
    const data = await getApiById(id);
    return NextResponse.json(data);
  }
  const list = await getApis();
  return NextResponse.json(list);
}

//  Export a named export for each HTTP method instead.

export async function PATCH(request: Request) {
  return NextResponse.json({})
}
export async function HEAD(request: Request) {
  return NextResponse.json({})
}
export async function OPTIONS(request: Request) {
  return NextResponse.json({})
}

