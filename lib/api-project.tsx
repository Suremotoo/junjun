import { initializeDatabase } from "./db";

const baseFields =
  "id, name,alias_name as aliasName, description, created_at AS createdAt, updated_at AS updatedAt";

export async function getProjects() {
  const db = await initializeDatabase();
  const [rows] = await db.query(
    "SELECT " +
      baseFields +
      " FROM jj_project WHERE is_delete = '0' order by id desc"
  );
  return rows;
}

export async function getProjectById(id: string) {
  const db = await initializeDatabase();
  const [rows] = await db.query(
    "SELECT " + baseFields + " FROM jj_project WHERE id = ?",
    [id]
  );
  const row = rows[0];
  if (!row) {
    return null;
  }
  return row;
}

export async function createProject(project) {
  const db = await initializeDatabase();
  await db.query(
    "insert into jj_project (name, alias_name, description) VALUES (?, ?, ?)",
    [project.name, project.aliasName, project.description]
  );
}

export async function updateProject(project) {
  const db = await initializeDatabase();
  await db.query(
    "UPDATE jj_project SET name = ?, alias_name = ?, description = ? WHERE id = ?",
    [project.name, project.aliasName, project.description, project.id]
  );
}

export async function deleteProject(id: string) {
  const db = await initializeDatabase();
  await db.query("UPDATE jj_project SET is_delete = '1' WHERE id = ?", [id]);
}
