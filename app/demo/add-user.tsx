"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@/components/plusIcon";
// import { User } from "@/models/User";
import { useForm, Controller } from "react-hook-form";
import { statusOptions } from "./data";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../lib/api-user";

import { User, emptyUserTyped } from "@/models/User";
import { FormComponentProps, OperationType } from "@/models/crud";

export default function AddUser({
  refreshList,
  operationType = OperationType.Create,
  primaryKey,
  onCloseForm,
}: FormComponentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(emptyUserTyped);
  // let currentUser: User = emptyUserTyped;

  useEffect(() => {
    async function fetchData() {
      try {
        if (operationType == OperationType.Update && primaryKey) {
          console.log("primaryKey", primaryKey);

          const queryUser = await getUserById(primaryKey);
          const userObj = User.fromObject(queryUser);
          setCurrentUser(queryUser);
          console.log("form get user:", userObj);
          // 手动设置表单的值
          Object.keys(queryUser).forEach((key) => {
            setValue(key, queryUser[key]);
          });
          return userObj;
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    const userInfo = fetchData();
    console.log("form userInfo:", userInfo);
  }, [primaryKey]);

  const isUpd: boolean = currentUser && currentUser.id !== null;

  useEffect(() => {
    if (operationType === OperationType.Update && primaryKey) {
      // openBtnRef.current.click();
      onOpen();
    }
  }, [operationType, primaryKey]);

  async function onSubmit(data) {
    setIsLoading(true); // Set loading to true when the request starts

    try {
      console.log("formData");
      console.log(JSON.stringify(data));
      await performOperation(operationType, data);
      MySwal.fire({
        title: <p>Success</p>,
        icon: "success",
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        },
        willClose: () => {
          closeBtnRef.current ? closeBtnRef.current.click() : null;
          refreshList(true);
        },
      });
    } catch (error) {
      // Handle error if necessary
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  async function performOperation(operation: OperationType, formData: object) {
    switch (operation) {
      case OperationType.Create:
        await createUser(formData);
        break;
      case OperationType.Delete:
        deleteUser(formData.id);
        break;
      case OperationType.Update:
        await updateUser(formData);
        break;
      case OperationType.Retrieve:
        break;
      default:
        // 处理未知操作类型
        break;
    }
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: currentUser && currentUser.id !== null ? currentUser.id : null,
      name: currentUser.name || "",
      role: currentUser.role || "",
      team: currentUser.team || "",
      status: currentUser.status || "",
      age: currentUser.age || "",
      avatar: currentUser.avatar || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
    },
  });

  return (
    <div>
      <>
        {!isUpd && OperationType.Create === operationType && (
          <Button
            onPress={onOpen}
            ref={openBtnRef}
            className={isUpd ? "hidden" : ""}
            color="primary"
            endContent={<PlusIcon />}
          >
            Add User
          </Button>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          onClose={() => {
            console.log("onClose");
            onCloseForm();
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add User
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      label="Name"
                      variant="bordered"
                      isRequired
                      errorMessage={errors.name && "Name is required"}
                      validationState={errors.name ? "invalid" : "valid"}
                      value={watch("name")}
                      {...register("name", {
                        required: true,
                      })}
                    />

                    <Input
                      label="Role"
                      variant="bordered"
                      value={watch("role")}
                      {...register("role")}
                    />
                    <Input
                      label="Team"
                      value={watch("team")}
                      variant="bordered"
                      {...register("team")}
                    />

                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: true }} // Add your validation rules here
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          label="Status"
                          name="status"
                          isRequired
                          placeholder="Select an status"
                          className="max-w-xs"
                          onBlur={onBlur}
                          onChange={onChange}
                          errorMessage={
                            errors.status && "Selecting an status is required"
                          }
                          selectedKeys={value ? [value] : []}
                        >
                          {statusOptions.map((statusInfo) => (
                            <SelectItem
                              key={statusInfo.uid}
                              value={statusInfo.uid}
                            >
                              {statusInfo.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                    <Input
                      label="Age"
                      value={watch("age")}
                      variant="bordered"
                      {...register("age")}
                    />
                    <Input
                      label="Avatar"
                      value={watch("avatar")}
                      variant="bordered"
                      {...register("avatar")}
                    />
                    <Input
                      label="Email"
                      value={watch("email")}
                      placeholder="Enter your email"
                      variant="bordered"
                      description="We'll never share your email with anyone else."
                      onClear={() => console.log("clear")}
                      isRequired
                      errorMessage={errors.email && "Email is required"}
                      validationState={errors.email ? "invalid" : "valid"}
                      {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                      })}
                    />
                    <Input
                      label="Phone"
                      value={watch("phone")}
                      variant="bordered"
                      errorMessage={errors.phone && "phone is invalid"}
                      validationState={errors.phone ? "invalid" : "valid"}
                      {...register("phone", {
                        maxLength: 11,
                        minLength: 11,
                      })}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="button"
                      color="danger"
                      variant="flat"
                      onClick={onClose}
                      onPress={() => reset()}
                      ref={closeBtnRef}
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      onPress={() => {
                        console.log("errors", errors);
                        // handleSubmit(onSubmit);
                      }}
                      spinner={
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                      }
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </Button>

                    <Button type="reset" onPress={() => reset()}>
                      Reset
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </>
    </div>
  );
}
