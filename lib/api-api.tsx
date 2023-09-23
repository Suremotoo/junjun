import { initializeDatabase } from "./db";

const baseFields =
  "id, project_id AS projectId, name, description, endpoint_url AS endpointUrl, created_at AS createdAt, updated_at AS updatedAt ";

export async function getApis() {
  const db = await initializeDatabase();
  const [rows] = await db.query(
    "SELECT " +
      baseFields +
      " FROM jj_api WHERE is_delete = '0' order by id desc"
  );
  return rows;
}

export async function getApiById(id: string) {
  const db = await initializeDatabase();
  const [rows] = await db.query(
    "SELECT " + baseFields + " FROM jj_api WHERE id = ?",
    [id]
  );
  const row = rows[0];
  if (!row) {
    return null;
  }
  return row;
}

export async function createApi(api) {
  const db = await initializeDatabase();
  await db.query(
    "insert into jj_api (project_id, name, description, endpoint_url) VALUES (?, ?, ?, ?)",
    [api.projectId, api.name, api.description, api.endpointUrl]
  );
}

export async function updateApi(api) {
  const db = await initializeDatabase();
  await db.query(
    "UPDATE jj_api SET project_id = ?, name = ?, description = ?, endpoint_url = ? WHERE id = ?",
    [api.projectId, api.name, api.description, api.endpointUrl, api.id]
  );
}

export async function deleteApi(id: string) {
  const db = await initializeDatabase();
  await db.query("UPDATE jj_api SET is_delete = '1' WHERE id = ?", [id]);
}
