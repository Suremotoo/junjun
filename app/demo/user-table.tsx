"use client";

import { Chip, User as UserUIComponent, Tooltip } from "@nextui-org/react";
import { User } from "@/models/User";
import { EyeIcon } from "@/components/eyeIcon";
import { EditIcon } from "@/components/editIcon";
import { DeleteIcon } from "@/components/deleteIcon";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function UserTablePage({
  user,
  columnKey,
  handleShowDetails,
}: {
  user: User;
  columnKey: string;
  handleShowDetails: (itemKey: any) => void;
}) {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <UserUIComponent
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </UserUIComponent>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {user.team}
          </p>
        </div>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[user.status]}
          size="sm"
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip color="secondary" content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon
                onClick={() => {
                  handleShowDetails(user.id);
                  console.log("user-table components handleShowDetails clicked");
                }}
              />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
}
