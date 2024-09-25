import { useEffect, useMemo, useState } from "react";
import { ISelectOption, ISelectProps } from "./interface";
import { isEqual } from "lodash";

import { escapeRegExpChar } from "helpers/regex";
import { twMerge } from "tailwind-merge";
import {
  InputAdornment,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Checkbox,
} from "@mui/material";
import ChevronDown from "@assets/svg/chevron-down.svg";
import XClose from "@assets/svg/x-close.svg";
import Search from "@assets/svg/search.svg";
 import Asteric from '@assets/icons/Label.svg';
import Input from "../Input";
import FieldHelperText from "../FieldHelperText";

const selectAllOptionValue = "component~select~all~option";
const Select = (props: ISelectProps) => {
  const {
    label,
    title,
    className,
    helperText,
    startAdornment,
    endAdornment,
    options,
    multiple,
    value,
    onChange,
    showSelectAll,
    showChipPreview,
    renderValue,
    displayEmpty,
    placeholder,
    IconComponent,
    classes,
    searchable,
    renderedValueClassName,
    asteric,
    singleSelection,
    // onSearch,
    // EoL: EoLProps,
    onClose,
    ...rest
  } = props;

  const [selectedValues, setSelectedValues] = useState<unknown>(
    value || (multiple ? [] : "")
  );
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const optionsLabelByValue = useMemo(() => {
    const optionsLabelByValue: Record<string, string> = {};
    options.forEach((option) => {
      optionsLabelByValue[option.value] = option.label;
    });

    return optionsLabelByValue;
  }, [options]);
  const optionsByValue = useMemo(() => {
    const optionsByValue: Record<string, ISelectOption> = {};
    options.forEach((option) => {
      optionsByValue[option.value] = option;
    });

    return optionsByValue;
  }, [options]);

  useEffect(() => {
    if (value && !isEqual(value, selectedValues)) {
      setSelectedValues(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // useEffect(() => {
  //   if (onSearch) {
  //     onSearch(searchQuery);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchQuery]);

  const onSelectedChange = (event: SelectChangeEvent<unknown>) => {
    if (multiple) {
      let newSelectedValues = (event.target.value as string[]).filter(
        (value) => value
      ); //Filter invalid values

      if (newSelectedValues.includes(selectAllOptionValue)) {
        if ((selectedValues as string[]).length === options.length) {
          newSelectedValues = [];
        } else {
          newSelectedValues = options.map((option) => option.value);
        }
      }

      setSelectedValues(newSelectedValues);
      if (onChange) {
        onChange(newSelectedValues);
      }
    } else {
      const newSelectedValues = event.target.value as string;
      if (newSelectedValues) {
        setSelectedValues(newSelectedValues);
        if (onChange) {
          onChange(newSelectedValues);
        }
      }
    }
  };

  const defaultRenderValue = (selected: unknown) => {
    let _selected: string | string[] = selected as string;

    if (multiple) {
      _selected = selected as string[];
      return (_selected as string[])
        .map((value) => optionsLabelByValue[value])
        .join(", ");
    }
    return optionsLabelByValue[_selected];
  };

  const menuItemPadding = "!px-[24px] !py-[9px]";
  const menuItemClassName = `${menuItemPadding} !text-[12px] !justify-between !items-center !gap-[8px] !w-full !cursor-pointer`;
  const values = multiple
    ? ((value || selectedValues) as string[])
    : ((value || selectedValues) as string);

  const reg = new RegExp(escapeRegExpChar(searchQuery), "i");
  const searchResultValues: string[] = options
    .filter((option) => !searchQuery || option.label.match(reg))
    .map((option) => option.value);

  // const EoLRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-full h-max overflow-hidden">
      {label && asteric ? (
        <div className="flex items-center">
          <label className="text-[13px] leading-5 text-[#333]">{label}</label>
          <img src={Asteric} alt="asteric" className="ml-[4px]" />
        </div>
      ) : (
        <label className="pb-[3px] text-[#333333]">{label}</label>
      )}
      {/* {labelHelperText && (
        <FieldLabelHelperText {...(labelHelperTextProps || {})}>
          {labelHelperText}
        </FieldLabelHelperText>
      )} */}

      <MUISelect
        {...rest}
        displayEmpty={displayEmpty}
        value={values}
        multiple={multiple}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={(e) => {
          setOpen(false);
          setSearchQuery("");
          onClose?.(e);
        }}
        renderValue={(selected) => {
          const placeholderValue = placeholder || "";

          const Value = (renderValue ? renderValue : defaultRenderValue)(
            selected,
            multiple ? optionsByValue : optionsByValue[selected as string]
          );

          const renderReturnValue = (returnValue: React.ReactNode) => {
            return (
              <div
                className={twMerge(
                  "grid grid-flow-col justify-between w-full gap-[8px]",
                  renderedValueClassName
                )}
              >
                {returnValue}
                <div className={open ? " h-max rotate-180" : "h-max"}>
                  {IconComponent ? (
                    <IconComponent />
                  ) : (
                    <img src={ChevronDown} alt="icon" />
                  )}
                </div>
              </div>
            );
          };
          if (!Value || values.length === 0) {
            return renderReturnValue(placeholderValue);
          }

          return renderReturnValue(Value);
        }}
        onChange={onSelectedChange}
        classes={{
          ...classes,
          root: twMerge(
            "!grid grid-flow-col gap-2 auto-cols-auto-max",
            classes?.root
          ),
          icon: twMerge("!static mr-[12px]", classes?.icon),
          select: twMerge(
            "!w-auto !text-[12px] !pr-[14px]",
            className,
            classes?.select
          ),
        }}
        MenuProps={{
          classes: {
            list: `!py-[16px]${searchable ? " !pt-0" : ""}`,
          },
          autoFocus: false,
        }}
        IconComponent={() => null}
        startAdornment={
          startAdornment ? (
            <InputAdornment position="start" className="cursor-pointer">
              {startAdornment}
            </InputAdornment>
          ) : null
        }
        endAdornment={
          endAdornment ? (
            <InputAdornment position="end" className="cursor-pointer">
              {endAdornment}
            </InputAdornment>
          ) : null
        }
      >
        {searchable && (
          <div
            className={twMerge(
              menuItemPadding,
              "sticky top-0 bg-white z-[1] !py-[16px]"
            )}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Input
              className="!pl-0 !rounded-[12px]"
              startAdornment={<Search />}
              startAdornmentProps={{
                className: "!border-0",
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              placeholder="Search"
              onChange={(value) => {
                setSearchQuery(value.target.value);
              }}
            />
          </div>
        )}
        {title && <p className="pl-4">{title}</p>}
        {/* <MenuList> */}
        {multiple && showSelectAll && (
          <MenuItem
            value={selectAllOptionValue}
            className={twMerge(menuItemClassName, "!text-primary-main")}
          >
            {values.length === options.length ? "Unselect All" : "Select All"}
          </MenuItem>
        )}
        {options.map((option) => {
          const { label, value, disabled } = option;
          return (
            <MenuItem
              key={value}
              value={value}
              className={menuItemClassName}
              disabled={disabled}
              style={{
                display: !searchResultValues.includes(value)
                  ? "none"
                  : undefined,
              }}
              onClick={() => {
                option?.onClick?.();
              }}
            >
              <div className="flex items-center">
                {option.startAdornment}
                {label}
                {option.endAdornment}
              </div>
              {singleSelection && (
                <Checkbox sx={{ "&.Mui-checked": { color: "#F58320" } }} />
              )}
              {multiple && (
                <Checkbox sx={{ "&.Mui-checked": { color: "#F58320" } }} />
                // <CheckboxComponent
                //   checked={values.indexOf(value) > -1}
                //   className="w-max"
                // />
              )}
            </MenuItem>
          );
        })}
        {/* </MenuList> */}
        {/* {EoLProps?.show && (
          <EoL
            ref={EoLRef}
            showLoader={EoLProps?.showLoader}
            onVisible={EoLProps?.onVisible}
            config={{
              threshold: 0.1,
              root: EoLRef?.current?.parentElement?.parentElement || null,
            }}
          />
        )} */}
      </MUISelect>
      {multiple && showChipPreview && values.length > 0 && (
        <div className="mt-[8px]">
          <div className="flex flex-wrap -mt-2">
            {(values as string[]).map((value, index) => {
              return (
                <Chip
                  key={index}
                  label={optionsLabelByValue[value]}
                  className="!text-[12px] !mr-2 !mt-2"
                  deleteIcon={
                    <img
                      src={XClose}
                      alt="icon"
                      className="w-[16px] h-[16px]"
                    />
                  }
                  onDelete={() => {
                    onSelectedChange({
                      target: {
                        value: (values as string[]).filter(
                          (item) => item !== value
                        ),
                      },
                    } as SelectChangeEvent<unknown>);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      <FieldHelperText error={props.error} helperText={helperText} />
    </div>
  );
};

Select.defaultProps = {
  multiple: false,
  showSelectAll: false,
  displayEmpty: true,
  showChipPreview: false,
  searchable: false,
};

export default Select;
