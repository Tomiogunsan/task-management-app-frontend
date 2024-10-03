import CircularProgress from 'shared/CircularProgress';
import { twMerge } from 'tailwind-merge';

const TableLoading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'font-title h-[400px] flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full',
        className,
      )}
    >
      <CircularProgress size={30} colorClassName='#000'/>
      <p className="mt-[25px]">{title}</p>
    </div>
  );
};
export default TableLoading;
