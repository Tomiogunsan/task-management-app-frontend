import { IModalProps } from "./interface";
import { twMerge } from "tailwind-merge";
import Button from "shared/Button";
import ModalBase from "./ModalBase";

const defaultAction = {
  show: true,
  text: "Confirm",
};

const Modal = ({
  onClose,
  icon,
  children,
  header,
  action: propsAction,
  secondaryAction,
  subHeader,
  className,

  actionsClassName,
  ...rest
}: IModalProps) => {
  const action = {
    ...defaultAction,
    ...propsAction,
  };

  return (
    <ModalBase
      {...rest}
      onClose={onClose}
      header={
        <>
          {icon !== null ? (
            <>
              {icon ? (
                <div className="text-black rounded-full overflow-hidden w-max h-max flex">
                  {icon}
                </div>
              ) : (
                <div className="icon-alert-hexagon w-max text-black font-bold bg-tertiary-light-1 p-[12px] rounded-[99999px]" />
              )}
            </>
          ) : null}
          <div
            className={`text-[#0F172A] text-base font-semibold${
              icon !== null ? " mt-[16px]" : ""
            }`}
          >
            {header}
            <p className="text-secondary-light-2 text-[12px] text-gray-500  font-[400]">
              {subHeader}
            </p>
          </div>
        </>
      }
      actions={
        (secondaryAction?.show || action?.show) && (
          <div
            className={twMerge(
              "w-full grid grid-flow-col gap-[24px] mt-[16px] pt-[24px]  px-[24px]  pb-[40px]",
              action?.show &&
                secondaryAction?.show &&
                "border-t-[1px] border-gray-100",
              actionsClassName
            )}
          >
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
        )
      }
      className={twMerge(
        className,
        `${!secondaryAction?.show && !action?.show ? "pb-[32px]" : ""}`
      )}
    >
      {children}
    </ModalBase>
  );
};

Modal.defaultProps = {
  action: defaultAction,
};

export default Modal;
