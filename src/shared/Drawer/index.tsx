import { IModalProps } from './interface';
import { twMerge } from 'tailwind-merge';
// import ModalBoxLayout from 'shared/ModalBoxLayout';
import { RxCross2 } from "react-icons/rx";
import Button from 'shared/Button';

const defaultAction = {
  show: false,
  text: 'Confirm',
};

const Drawer = ({
  onClose,
  icon,
  children,
  header,
  containerClassName,
  contentClassName,
  subHeader,
  action: propsAction,
  secondaryAction,
}: // ...rest
IModalProps) => {
  const action = {
    ...defaultAction,
    ...propsAction,
  };
  return (
    <div className="fixed flex inset-0 z-[100] transition-opacity w-[100vw] h-[100vh]">
      <div
        className="fixed inset-0 z-[0] bg-gray-500 bg-opacity-75 w-[100vw] h-[100vh]"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div
        className={twMerge(
          `bg-white absolute left-auto right-0 w-full max-w-[400px] h-screen ${
            header ? "grid-rows-max-auto-max" : "grid-rows-auto-max"
          }`,
          containerClassName
        )}
      >
        {header && (
          <div className=" z-[1] p-[24px] pb-[20px] border-b-[1px] border-gray-100 w-full sticky top-[0px] bg-white">
            <>
              <div className="flex justify-between">
                {icon !== null ? (
                  <>
                    {icon ? (
                      icon
                    ) : (
                      <div className="icon-alert-hexagon text-black font-bold bg-tertiary-light-1 p-[12px] rounded-[99999px]" />
                    )}
                  </>
                ) : null}
                <RxCross2
                  className="w-[24px] h-[24px] cursor-pointer text-black"
                  onClick={onClose}
                />
              </div>

              <div
                className={`text-[#0F172A] text-base font-semibold${
                  icon !== null ? " mt-[18px]" : ""
                }`}
              >
                {header}
              </div>
            </>
            {subHeader && (
              <div
                className={`text-gray-400 text-[12px] ${
                  icon !== null ? " mt-[6px]" : ""
                }`}
              >
                {subHeader}
              </div>
            )}
          </div>
        )}

        <div
          className={twMerge(
            "p-[24px] overflow-auto grid grid-rows-auto-max",
            (secondaryAction?.show || action?.show) && "pb-0",
            contentClassName
          )}
        >
          {children}
        </div>

        {(secondaryAction?.show || action?.show) && (
          <div className="z-[1] p-[24px] w-full sticky bottom-[0px] bg-white grid grid-flow-col gap-[24px]">
            {secondaryAction?.show && secondaryAction?.text && (
              <Button
                className={twMerge("w-full", secondaryAction?.className)}
                onClick={secondaryAction?.onClick}
                loading={secondaryAction?.loading}
                loadingText={secondaryAction?.loadingText}
                disabled={secondaryAction?.disabled}
                variant={secondaryAction?.variant}
                color={secondaryAction?.color}
              >
                {secondaryAction?.text}
              </Button>
            )}
            {action?.show && action?.text && (
              <Button
                className={twMerge("w-full", action?.className)}
                onClick={action?.onClick}
                loading={action?.loading}
                loadingText={action?.loadingText}
                disabled={action?.disabled}
                variant={action?.variant}
                color={action?.color}
              >
                {action?.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  action: defaultAction,
};

export default Drawer;
