import { format } from "date-fns";
import { IStatusType } from "shared/StatusBadge";

export const formatDate = ({
  date,
  time,
}: {
  date: string | Date;
  time?: boolean;
}) => {
  if (date === null) return;
  if (time) {
    return format(new Date(date), "dd MMM, yyyy • hh:mma");
  } else {
    return format(new Date(date), "dd MMM, yyyy");
  }
};

export const capitalize = (text: string | number | undefined) => {
  if (text === null || typeof text !== "string") return;

  const words = text.includes("_") ? text.split("_") : text.split(" ");

  const output = words.map((word) => {
    const capitalizedWord =
      word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return capitalizedWord;
  });
  return output.join(" ");
};

export const getClass = (text: IStatusType) => {
  const defaultClassName = "py-[5px] px-[12px] font-[400] rounded-lg";
  switch (text) {
    case "completed":
      return `${defaultClassName} bg-[#DAFBEC] text-[#052E16]`;

    case "pending":
      return `${defaultClassName} bg-[#FCD9DC] text-[#720B18]`;

    case "in-progress":
      return `${defaultClassName} bg-[#cccdff] text-[#0800ff]`;
  }
};

export const formatTime = (createdAt: string) => {
  return format(new Date(createdAt), "hh:mm a");
};
