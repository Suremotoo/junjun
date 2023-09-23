
import { getUsers, deleteUser, getUserById, createUser, updateUser } from "@/lib/api-user";
import { NextResponse } from "next/server";

// Handles requests to /api/project

export async function POST(request: Request) {
  const formData = await request.json();
  createUser(formData);
  return NextResponse.json({})
}

export async function PUT(request: Request) {
  const formData = await request.json();
  updateUser(formData);
  return NextResponse.json({})
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  deleteUser(id);
  return NextResponse.json({})
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  console.log("id", id);
  if (id) {
    const user = await getUserById(id);
    return NextResponse.json(user);
  }
  const list = await getUsers();
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

