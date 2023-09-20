import { SkeletonFormProps } from "@/models/crud";
import { Input, Skeleton } from "@nextui-org/react";

export default function SkeletonForm({
  isLoaded,
  numberOfControls,
  className,
}: SkeletonFormProps) {
  const controlsJSX = [];
  for (let i = 0; i < numberOfControls; i++) {
    controlsJSX.push(
      <Skeleton
        isLoaded={isLoaded}
        className={className}
        key={"SkeletonForm_" + i}
      >
        <Input label={"SkeletonForm_" + i} disabled variant="bordered" />
      </Skeleton>
    );
  }
  return <>{controlsJSX}</>;
}
