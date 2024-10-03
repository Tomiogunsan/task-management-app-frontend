import { IFilterModalProps } from './interface';
import Modal from './';
import { FieldValues } from 'react-hook-form';
import { useEffect, useState } from 'react';

const defaultAction = {
  show: true,
  text: 'Apply Filter',
};
const FilterModal = <TFieldValues extends FieldValues>({
  onClose,
  children,
  header,
  action: propsAction,
  showClearAll,
  form,
}: IFilterModalProps<TFieldValues>) => {
  const [prevValues, setPrevValues] = useState<TFieldValues>(
    {} as TFieldValues,
  );

  useEffect(() => {
    setPrevValues(form.getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const action = {
    ...defaultAction,
    ...propsAction,
  };

  const onModalClose = () => {
    form.reset(prevValues, {
      keepDefaultValues: true,
    });
    onClose?.();
  };

  const clearForm = () => {
    form.reset(undefined, {
      keepDefaultValues: true,
    });
  };

  return (
    <Modal
      icon={null}
      onClose={onModalClose}
      containerClassName="min-w-[500px]"
      header={
        <div className="font-[600] text-gray-800 text-[16px] w-full flex justify-between">
          {header ? header : 'Filter'}
          {showClearAll && (
            <span
              className="text-cancel-red-main text-[13px] font-[400] cursor-pointer"
              onClick={clearForm}
            >
              Clear All
            </span>
          )}
        </div>
      }
      action={action}
    >
      <div className="grid gap-[24px]">{children}</div>
    </Modal>
  );
};

export default FilterModal;
