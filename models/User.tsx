// models/User.js
export class User {
  id: number | null;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
  phone: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(
    id: number,
    name: string,
    role: string,
    team: string,
    status: string,
    age: string,
    avatar: string,
    email: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.team = team;
    this.status = status;
    this.age = age;
    this.avatar = avatar;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromObject(obj: any) {
    return new User(
      obj.id,
      obj.name,
      obj.role,
      obj.team,
      obj.status,
      obj.age,
      obj.avatar,
      obj.email,
      obj.phone,
      obj.createdAt,
      obj.updatedAt
    );
  }
}

const emptyUser: Partial<User> = {
  id: null,
  name: "",
  role: "",
  team: "",
  status: "",
  age: "",
  avatar: "",
  email: "",
  phone: "",
  createdAt: null,
  updatedAt: null,
};

export const emptyUserTyped: User = emptyUser as User;