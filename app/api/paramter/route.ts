
import { getParams, deleteParam, getParamById, createParam, updateParam, getParamsByApiId } from "@/lib/api-paramter";
import { NextResponse } from "next/server";

// Handles requests to /api/paramter

export async function POST(request: Request) {
  const formData = await request.json();
  createParam(formData);
  return NextResponse.json({})
}

export async function PUT(request: Request) {
  const formData = await request.json();
  updateParam(formData);
  return NextResponse.json({})
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  deleteParam(id);
  return NextResponse.json({})
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  const apiId = url.searchParams.get("apiId")
  if (id) {
    const data = await getParamById(id);
    return NextResponse.json(data);
  }
  if (apiId) {
    const params = await getParamsByApiId(apiId);
    return NextResponse.json(params);
  }
  const list = await getParams();
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

