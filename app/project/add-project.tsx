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
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@/components/plusIcon";
import { useForm } from "react-hook-form";

import { Project, emptyProjectTyped } from "@/models/Project";
import { FormComponentProps, OperationType } from "@/models/crud";
import SkeletonForm from "@/components/SkeletonForm";

export default function AddProject({
  refreshList,
  operationType = OperationType.Create,
  primaryKey,
  onCloseForm,
}: FormComponentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const [currentItem, setCurrentItem] = useState(emptyProjectTyped);

  useEffect(() => {
    async function fetchData() {
      try {
         setIsLoading(true);
        if (operationType == OperationType.Update && primaryKey) {
          console.log("primaryKey", primaryKey);

          // const queryItem = await getProjectById(primaryKey);
          const queryItem = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/project?id=${encodeURIComponent(primaryKey)}`,
            {
              method: "GET",
            }
          ).then((res) => res.json());
          const itemObj = Project.fromObject(queryItem);
          setCurrentItem(queryItem);
          console.log("form get item:", itemObj);

          Object.keys(queryItem).forEach((key) => {
            setValue(key, queryItem[key] ? queryItem[key] : undefined);
          });
          return itemObj;
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    const fetchItemData = fetchData();
    console.log("form project:", fetchItemData);
  }, [primaryKey]);

  const isUpd: boolean = currentItem && currentItem.id !== null;

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
        // await createProject(formData);
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project", {
          method: "POST",
          body: JSON.stringify(formData),
        }).then((res) => res.json());
        break;
      case OperationType.Delete:
        // deleteProject(formData.id);
        break;
      case OperationType.Update:
        // await updateProject(formData);
          await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/project", {
            method: "PUT",
            body: JSON.stringify(formData),
          }).then((res) => res.json());
        break;
      case OperationType.Retrieve:
        break;
      default:
        break;
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: currentItem && currentItem.id !== null ? currentItem.id : null,
      name: currentItem.name || "",
      aliasName: currentItem.aliasName || "",
      description: currentItem.description || "",
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
            Add Project
          </Button>
        )}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onCloseForm}
          backdrop="blur"
          placement="top-center"
        >
          <form onSubmit={handleSubmit(onSubmit)} action="#">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Project
                  </ModalHeader>
                  <ModalBody>
                    {isLoading && (
                      <SkeletonForm
                        isLoaded={!isLoading}
                        numberOfControls={3}
                        className="rounded-lg"
                      />
                    )}
                    {!isLoading && (
                      <>
                        <Input
                          label="Name"
                          variant="bordered"
                          isRequired
                          value={watch("name")}
                          errorMessage={errors.name && "Name is required"}
                          validationState={errors.name ? "invalid" : "valid"}
                          {...register("name", {
                            required: true,
                          })}
                        />
                        <Input
                          label="AliasName"
                          variant="bordered"
                          isRequired
                          value={watch("aliasName")}
                          errorMessage={
                            errors.aliasName && "aliasName is required"
                          }
                          validationState={
                            errors.aliasName ? "invalid" : "valid"
                          }
                          {...register("aliasName", {
                            required: true,
                          })}
                        />

                        <Input
                          label="Description"
                          variant="bordered"
                          value={watch("description")}
                          {...register("description")}
                        />
                      </>
                    )}
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
