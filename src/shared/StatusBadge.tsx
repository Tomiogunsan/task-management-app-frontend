import { capitalize, getClass } from "@utils/constant";

import { twMerge } from "tailwind-merge";

export type IStatusType = 'pending' | 'in-progress' | 'completed'

const StatusBadge = ({
  status,
  className,
}: {
  status: IStatusType;
  className?: string;
}) => {
  return (
    <div className={twMerge(getClass(status), "w-max", className)}>
      {capitalize(status) === "Success" ? "Success" : capitalize(status)}
    </div>
  );
};
export default StatusBadge;
