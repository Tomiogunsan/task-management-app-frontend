import { RxCross2 } from "react-icons/rx";
import { IModalBaseProps } from "./interface";

import { twMerge } from "tailwind-merge";
import ModalBoxLayout from "shared/ModalBoxLayout";

const ModalBase = ({
  onClose,
  children,
  header,
  actions,
  className,
  containerClassName,
  hideCancelIcon,
  bgClassName,
  fgContentContainerClassName,
  bodyClassName,
}: IModalBaseProps) => {
  return (
    <ModalBoxLayout
      openModalBox={true}
      onBackgroundClick={onClose}
      className={bgClassName}
      contentContainerClassName={fgContentContainerClassName}
    >
      {!hideCancelIcon && (
        <RxCross2
          className="absolute top-[-16px] right-[-20px] bg-white rounded-full cursor-pointer p-[8px] h-[28px] w-[28px]"
          onClick={onClose}
        />
      )}
      <div
        className={twMerge(
          "w-full relative text-[14px] rounded-[32px] overflow-hidden grid",
          bodyClassName
        )}
      >
        <div
          className={twMerge(
            `bg-white grid w-[calc(100vw_-_3rem)] max-w-[400px] max-h-[calc(100vh_-_40px)] overflow-auto ${
              header ? "auto-rows-max-auto" : ""
            }`,
            containerClassName
          )}
        >
          {header && (
            <div className="z-[10] p-[24px] pb-[20px] border-b-[1px] border-gray-100 w-full sticky top-[0px] bg-white">
              {header}
            </div>
          )}
          <div
            className={twMerge(className, "pt-[16px] px-[24px] text-[#0F172A]")}
          >
            {children}
          </div>
          {actions}
        </div>
      </div>
    </ModalBoxLayout>
  );
};

export default ModalBase;
