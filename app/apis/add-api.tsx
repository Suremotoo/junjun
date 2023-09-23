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
import { Controller, useForm } from "react-hook-form";
import { getProjects } from "../../lib/api-project";

import { Project } from "@/models/Project";
import { Api, emptyApiTyped } from "@/models/Api";
import { FormComponentProps, OperationType } from "@/models/crud";
import SkeletonForm from "@/components/SkeletonForm";

export default function AddApi({
  refreshList,
  operationType = OperationType.Create,
  primaryKey,
  onCloseForm,
  cacheList,
}: FormComponentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const [currentItem, setCurrentItem] = useState(emptyApiTyped);
  const [projectList, setProjectList] = useState([]);

  async function initProjects() {
    const fetchedProjectList = await fetch("/api/project", {
      method: "GET",
    }).then((res) => res.json());
    const projectArray = fetchedProjectList.map(Project.fromObject);
    console.log(JSON.stringify(projectArray));
    setProjectList(projectArray);
  }
  useEffect(() => {
    initProjects();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (operationType == OperationType.Update && primaryKey) {
          console.log("primaryKey", primaryKey);
          const queryItem = await fetch(
            `/api/apis?id=${encodeURIComponent(primaryKey)}`,
            {
              method: "GET",
            }
          ).then((res) => res.json());
          const itemObj = Api.fromObject(queryItem);
          setCurrentItem(queryItem);
          console.log("form get item:", itemObj);

          Object.keys(queryItem).forEach((key) => {
            setValue(key, queryItem[key] ? queryItem[key] : undefined);
          });
          setValue("projectId", queryItem.projectId + "");
          return itemObj;
        }
      } catch (error) {
        console.error("Error fetching apis:", error);
      } finally {
        setIsLoading(false);
      }
    }
    const fetchItemData = fetchData();
    console.log("form api:", fetchItemData);
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
      setIsLoading(false);
    }
  }

  async function performOperation(operation: OperationType, formData: object) {
    switch (operation) {
      case OperationType.Create:
         await fetch("/api/apis", {
           method: "POST",
           body: JSON.stringify(formData),
         }).then((res) => res.json());
        break;
      case OperationType.Delete:
        // ingore
        
        break;
      case OperationType.Update:
         await fetch("/api/apis", {
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
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      id: currentItem && currentItem.id !== null ? currentItem.id : null,
      name: currentItem.name || "",
      projectId: currentItem.projectId || null,
      description: currentItem.description || "",
      endpointUrl: currentItem.endpointUrl || "",
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
            Add API
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
                    Add API
                  </ModalHeader>
                  <ModalBody>
                    {isLoading && (
                      <SkeletonForm
                        isLoaded={!isLoading}
                        numberOfControls={4}
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
                        <Controller
                          name="projectId"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label="Project"
                              name="projectId"
                              isRequired
                              placeholder="Select a project"
                              className="max-w-xs"
                              onBlur={onBlur}
                              onChange={onChange}
                              errorMessage={
                                errors.projectId &&
                                "Selecting a project is required"
                              }
                              validationState={
                                errors.projectId ? "invalid" : "valid"
                              }
                              selectedKeys={value ? [value] : []}
                              items={projectList}
                            >
                              {projectList.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />
                        <Input
                          label="Description"
                          variant="bordered"
                          value={watch("description")}
                          {...register("description")}
                        />
                        <Input
                          label="EndpointUrl"
                          variant="bordered"
                          value={watch("endpointUrl")}
                          {...register("endpointUrl")}
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
