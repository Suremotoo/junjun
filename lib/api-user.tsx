"use server";

import { db } from "./db";

// 获取用户列表
export async function getUsers() {
  const [rows] = await db.query("SELECT * FROM users where is_delete = '0' order by id desc");
  return rows;
}

// 根据用户 ID 获取用户信息
export async function getUserById(id: string) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const row = rows[0];
  if (!row) {
    return null;
  }
  return row;
}

// 创建新用户
export async function createUser(user) {
  await db.query(
    "INSERT INTO users ( name, role, team, status, age, avatar, email, phone)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user.name,
      user.role,
      user.team,
      user.status,
      user.age,
      user.avatar,
      user.email,
      user.phone,
    ]
  );
}

// 更新用户信息
export async function updateUser(user) {
  await db.query(
    "UPDATE users SET name = ?, role = ?, team = ?, status = ?, age = ?, avatar = ?, email = ?, phone = ? WHERE id = ?",
    [
      user.name,
      user.role,
      user.team,
      user.status,
      user.age,
      user.avatar,
      user.email,
      user.phone,
      user.id,
    ]
  );
}

// 更新用户信息
export async function deleteUser(id: string) {
  console.log('delete user db =>> ', id)
  await db.query("UPDATE users SET is_delete = '1' WHERE id = ?", [id]);
}
