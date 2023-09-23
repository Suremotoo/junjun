import { initializeDatabase } from "./db";

// user list
export async function getUsers() {
  const db = await initializeDatabase();
  const [rows] = await db.query("SELECT * FROM users where is_delete = '0' order by id desc");
  return rows;
}

export async function getUserById(id: string) {
  const db = await initializeDatabase();
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  const row = rows[0];
  if (!row) {
    return null;
  }
  return row;
}


export async function createUser(user) {
  const db = await initializeDatabase();
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


export async function updateUser(user) {
  const db = await initializeDatabase();
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

export async function deleteUser(id: string) {
  const db = await initializeDatabase();
  console.log('delete user db =>> ', id)
  await db.query("UPDATE users SET is_delete = '1' WHERE id = ?", [id]);
}
