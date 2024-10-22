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


export const capitalize = (text: string | number | undefined) => {
  if (text === null || typeof text !== 'string') return;

  const words = text.includes('_') ? text.split('_') : text.split(' ');

  const output = words.map(word => {
    const capitalizedWord =
      word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return capitalizedWord;
  });
  return output.join(' ');
};