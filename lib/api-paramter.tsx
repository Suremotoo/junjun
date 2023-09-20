"use server";

import { db } from "./db";

const baseFields =
  " id, api_id AS apiId, name, cn_name as cnName, param_type AS paramType, description, CAST(is_required AS SIGNED) = 1 as isRequired,created_at AS createdAt, updated_at AS updatedAt ";

export async function getParams() {
  const [rows] = await db.query(
    "SELECT " +
      baseFields +
      " FROM jj_parameter WHERE is_delete = '0' order by id desc"
  );
  return rows;
}

export async function getParamById(id: string) {
  const [rows] = await db.query(
    "SELECT " + baseFields + " FROM jj_parameter WHERE id = ?",
    [id]
  );
  const row = rows[0];
  if (!row) {
    return null;
  }
  return row;
}

export async function createParam(param) {
  await db.query(
    "insert into jj_parameter (api_id, name, cn_name, param_type, description, is_required) VALUES (?, ?, ?, ?, ?, ?)",
    [
      param.apiId,
      param.name,
      param.cnName,
      param.paramType,
      param.description,
      param.isRequired,
    ]
  );
}

export async function updateParam(param) {
  await db.query(
    "UPDATE jj_parameter SET api_id = ?, name = ?, cn_name = ?, param_type = ?, description = ?, is_required = ? WHERE id = ?",
    [
      param.apiId,
      param.name,
      param.cnName,
      param.paramType,
      param.description,
      param.isRequired,
      param.id,
    ]
  );
}

export async function deleteParam(id: string) {
  await db.query("UPDATE jj_parameter SET is_delete = '1' WHERE id = ?", [id]);
}

export async function getParamsByApiId(id: string) {
  const [rows] = await db.query(
    "SELECT " +
      baseFields +
      " FROM jj_parameter WHERE api_id = ? and is_delete = '0' ",
    [id]
  );
  return rows;
}
