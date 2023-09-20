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
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@/components/plusIcon";
import { Controller, useForm } from "react-hook-form";
import { getApis } from "../../lib/api-api";
import { createParam, updateParam, getParamById } from "../../lib/api-paramter";

import { Parameter, emptyParameterTyped } from "@/models/Paramter";
import { FormComponentProps, OperationType } from "@/models/crud";
import SkeletonForm from "@/components/SkeletonForm";
import { ParamTypeEnum } from "./data";
import { Api } from "@/models/Api";
import { useSearchParams } from "next/navigation";

export default function AddParamter({
  refreshList,
  operationType = OperationType.Create,
  primaryKey,
  onCloseForm,
  cacheList,
}: FormComponentProps) {
  const searchParams = useSearchParams();
  const searchApiId = searchParams.get("apiId");
  console.log("searchApiId==>", Number(searchApiId));

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const [currentItem, setCurrentItem] = useState(emptyParameterTyped);
  const [apiList, setApiList] = useState([]);
  const [isRequireSelected, setIsRequireSelected] = useState(false);
  const [selectApi, setSelectApi] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);

  async function initApis() {
    const fetchedApiList = await getApis();
    const apiArray = fetchedApiList.map(Api.fromObject);
    console.log(JSON.stringify(apiArray));
    setApiList(apiArray);
  }
  useEffect(() => {
    initApis();
    if (searchApiId && searchApiId !== "null") {
      setValue("apiId", searchApiId);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (operationType == OperationType.Update && primaryKey) {
          console.log("primaryKey", primaryKey);
          const queryItem = await getParamById(primaryKey);
          const itemObj = Parameter.fromObject(queryItem);
          setCurrentItem(queryItem);
          console.log("form get item:", itemObj);

          Object.keys(queryItem).forEach((key) => {
            setValue(key, queryItem[key] ? queryItem[key] : undefined);
          });
          setValue("apiId", queryItem.apiId.toString());
          setSelectApi(queryItem.apiId.toString());
          setIsRequireSelected(queryItem.isRequired);
          return itemObj;
        }
      } catch (error) {
        console.error("Error fetching apis:", error);
      } finally {
        setIsLoading(false);
      }
    }
    const fetchItemData = fetchData();
    console.log("form param:", fetchItemData);
  }, [primaryKey]);

  const isUpd: boolean = currentItem && currentItem.id !== null;

  useEffect(() => {
    if (operationType === OperationType.Update && primaryKey) {
      onOpen();
    }
  }, [operationType, primaryKey]);

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      if (selectApi === null || selectApi === undefined || selectApi === "") {
        console.log("selectApi is null");
        setShowErrMsg(true);
        return ;
      }
      data.apiId = Number(selectApi);
      data.isRequired = isRequireSelected;
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
        await createParam(formData);
        break;
      case OperationType.Delete:
        // ingore
        // deleteApi(formData.id);
        break;
      case OperationType.Update:
        await updateParam(formData);
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
      cnName: currentItem.cnName || "",
      apiId: currentItem.apiId || null,
      paramType: currentItem.paramType || "",
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
            Add Paramter
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
                    Add Paramter
                  </ModalHeader>
                  <ModalBody>
                    {isLoading && (
                      <SkeletonForm
                        isLoaded={!isLoading}
                        numberOfControls={5}
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
                            pattern: /^[A-Za-z0-9]+$/,
                          })}
                        />

                        <Input
                          label="CnName"
                          variant="bordered"
                          isRequired
                          value={watch("cnName")}
                          errorMessage={errors.cnName && "Name is required"}
                          validationState={errors.cnName ? "invalid" : "valid"}
                          {...register("cnName", {
                            required: true,
                          })}
                        />
                        {/* 数据大时，RHF 会卡顿 */}
                        {/* <Controller
                          name="apiId"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label="API"
                              name="apiId"
                              isRequired
                              placeholder="Select an API"
                              className="max-w-xs"
                              onBlur={onBlur}
                              onChange={onChange}
                              errorMessage={
                                errors.apiId && "Selecting an API is required"
                              }
                              validationState={
                                errors.apiId ? "invalid" : "valid"
                              }
                              selectedKeys={value ? [value] : []}
                              items={apiList}
                            >
                              {apiList.map((api) => (
                                <SelectItem key={api.id} value={api.id}>
                                  {api.name}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        /> */}

                        <Select
                          label="API"
                          name="apiIdSelect"
                          placeholder="Select an API"
                          className="max-w-xs"
                          isRequired
                          errorMessage={
                            showErrMsg && "Selecting an API is required"
                          }
                          validationState={showErrMsg ? "invalid" : "valid"}
                          onSelectionChange={(e) => {
                            const uniqueElement = Array.from(e);
                            console.log("uniqueElement", uniqueElement[0]);
                            setValue("apiId", uniqueElement[0]);
                            setSelectApi(uniqueElement[0]);
                            setShowErrMsg(false);
                          }}
                          selectedKeys={selectApi ? [selectApi] : []}
                          items={apiList}
                        >
                          {apiList.map((api) => (
                            <SelectItem key={api.id} value={api.id}>
                              {api.name}
                            </SelectItem>
                          ))}
                        </Select>

                        <Controller
                          name="paramType"
                          control={control}
                          defaultValue={ParamTypeEnum.String}
                          rules={{ required: true }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              label="Paramter Type"
                              name="paramType"
                              isRequired
                              placeholder="Select a type"
                              className="max-w-xs"
                              onBlur={onBlur}
                              onChange={onChange}
                              errorMessage={
                                errors.paramType &&
                                "Selecting a type is required"
                              }
                              validationState={
                                errors.paramType ? "invalid" : "valid"
                              }
                              selectedKeys={value ? [value] : []}
                            >
                              {Object.values(ParamTypeEnum).map((value) => (
                                <SelectItem key={value} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />

                        <Switch
                          onValueChange={setIsRequireSelected}
                          isSelected={isRequireSelected}
                        >
                          Required {isRequireSelected ? "true" : "false"}
                        </Switch>
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
