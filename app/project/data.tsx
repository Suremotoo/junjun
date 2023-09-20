const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "ALIASNAME", uid: "aliasName", sortable: true },
  { name: "DESCRIPTION", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "1" },
  { name: "Paused", uid: "2" },
  { name: "Vacation", uid: "3" },
];

export { columns, statusOptions };
