import {format} from 'date-fns'

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