
import { getProjects, deleteProject, getProjectById, createProject, updateProject } from "@/lib/api-project";
import { NextResponse } from "next/server";

// Handles requests to /api/project

export async function POST(request: Request) {
  const formData = await request.json();
  createProject(formData);
  return NextResponse.json({})
}

export async function PUT(request: Request) {
  const formData = await request.json();
  updateProject(formData);
  return NextResponse.json({})
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  deleteProject(id);
  return NextResponse.json({})
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")
  console.log("id", id);
  if (id) {
    const project = await getProjectById(id);
    return NextResponse.json(project);
  }
  const projects = await getProjects();
  return NextResponse.json(projects);
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

