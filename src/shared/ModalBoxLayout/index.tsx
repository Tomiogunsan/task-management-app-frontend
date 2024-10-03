import { IFilterBox } from '@interfaces/filterBox.interface';
import { twMerge } from 'tailwind-merge';

const ModalBoxLayout = ({
  openModalBox,
  children,
  onBackgroundClick,
  contentContainerClassName,
  className,
}: IFilterBox) => {
  return (
    openModalBox && (
      <div className="relative">
        <div
          className={twMerge(
            'fixed inset-0 z-[99999] transition-opacity bg-gray-500 bg-opacity-75 overflow-auto',
            className,
          )}
          onClick={onBackgroundClick}
        >
          <div className="flex fixed inset-0 z-10 overflow-y-auto overflow-x-hidden">
            <div
              className={twMerge(
                'h-max m-auto relative w-max max-w-full',
                contentContainerClassName,
              )}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalBoxLayout;
