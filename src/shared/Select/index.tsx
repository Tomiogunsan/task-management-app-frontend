import { twMerge } from "tailwind-merge";
import {
  InputAdornment,
  Select as MUISelect,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ISelectOption, ISelectProps } from "./interface";
import FieldHelperText from "shared/FieldHelperText";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isEqual } from "lodash";
import Input from "shared/Input";
import { escapeRegExpChar } from "helpers/regex";

import EoL from "shared/EoL";
import { RiArrowDropDownLine } from "react-icons/ri";

const selectAllOptionValue = "component~select~all~option";
const Select = (props: ISelectProps) => {
  const {
    label,
    labelClassName,
    labelContainerClassName,
    containerClassName,
    labelEndAdornment,

    className,
    helperText,
    startAdornment,
    endAdornment,
    options,
    multiple,
    value,
    onChange,
    showSelectAll,

    renderValue,
    displayEmpty,
    placeholder,
    IconComponent,
    StartIconComponent,
    classes,
    searchable,
    renderedValueClassName,
    onSearch,
    EoL: EoLProps,
    onClose,

    MenuProps,

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
    if (
      ![undefined, null].includes(value as null) &&
      !isEqual(value, selectedValues)
    ) {
      setSelectedValues(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const onSelectedChange = (event: SelectChangeEvent<unknown>) => {
    if (multiple) {
      let newSelectedValues = (
        event.target.value as ISelectOption["value"][]
      ).filter((value) => value); //Filter invalid values

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

  const renderSelectedValue = (
    selected: unknown,
    StartIcon?: React.ElementType,
    EndIcon?: React.ElementType
  ) => {
    const placeholderValue = placeholder || "";

    const Value = (renderValue ? renderValue : defaultRenderValue)(
      selected,
      multiple ? optionsByValue : optionsByValue[selected as string]
    );

    const renderReturnValue = (returnValue: React.ReactNode) => {
      return (
        <div
          className={twMerge(
            "grid grid-flow-col justify-between items-center w-full gap-[8px]",
            renderedValueClassName
          )}
        >
          {StartIcon && <StartIcon />}
          {returnValue}
          {EndIcon && (
            <div className={twMerge("flex h-max", open ? "rotate-180" : "")}>
              {<RiArrowDropDownLine size={20} />}
            </div>
          )}
        </div>
      );
    };
    if (!Value || (Array.isArray(values) && values.length === 0)) {
      return renderReturnValue(placeholderValue);
    }

    return renderReturnValue(Value);
  };

  const menuItemPadding = "!px-[24px] !py-[9px]";
  const menuItemClassName = `${menuItemPadding} !text-xs !justify-between !items-center !gap-[8px] !w-full !cursor-pointer`;
  const values = multiple
    ? ((value || selectedValues) as ISelectOption["value"][])
    : ((value || selectedValues) as ISelectOption["value"]);

  const reg = new RegExp(escapeRegExpChar(searchQuery), "i");
  const searchResultValues: ISelectOption["value"][] = options
    .filter((option) => !searchQuery || option.label.match(reg))
    .map((option) => option.value);

  const EoLRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (e: any) => {
    setOpen(false);
    setSearchQuery("");
    onClose?.(e);
  };

  return (
    <div
      className={twMerge(
        "w-full max-w-full h-max overflow-hidden",
        containerClassName
      )}
    >
      <div
        className={twMerge(
          "flex justify-between w-full",
          labelContainerClassName
        )}
      >
        {label && (
          <label
            className={twMerge(
              labelClassName,
              "text-[12px] text-gray-700 font-[400] align-left gap-[6px] block mb-[8px]"
            )}
          >
            {label}
          </label>
        )}
        {labelEndAdornment && labelEndAdornment}
      </div>

      <MUISelect
        {...rest}
        displayEmpty={displayEmpty}
        value={values}
        multiple={multiple}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={handleClose}
        renderValue={(selected) =>
          renderSelectedValue(
            selected,
            StartIconComponent,
            IconComponent
              ? IconComponent
              : () => <span className="icon-chevron-down text-sm font-bold" />
          )
        }
        onChange={onSelectedChange}
        classes={{
          ...classes,
          root: twMerge(
            "!grid grid-flow-col gap-2 auto-cols-auto-max",
            classes?.root
          ),
          icon: twMerge("!static mr-[12px]", classes?.icon),
          select: twMerge(
            "!w-auto !text-xs !pr-[14px]",
            className,
            classes?.select
          ),
          outlined: "!border-0",
        }}
        MenuProps={{
          autoFocus: false,
          ...MenuProps,
          classes: {
            list: twMerge(
              `!py-[16px] ${multiple ? "!pb-0" : ""} ${
                searchable ? " !pt-0" : ""
              }`,
              MenuProps?.className
            ),
          },
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
              startAdornment={<span className="icon-search text-base" />}
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
        {/* <MenuList> */}
        {multiple && Array.isArray(values) && showSelectAll && (
          <MenuItem
            value={selectAllOptionValue}
            className={twMerge(menuItemClassName, "!text-primary-main")}
          >
            {values.length === options.length ? "Unselect All" : "Select All"}
          </MenuItem>
        )}
        {options.map((option) => {
          const { label, labelNode, value, disabled } = option;
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
                {labelNode || label}
                {option.endAdornment}
              </div>
            </MenuItem>
          );
        })}
        {/* </MenuList> */}
        {EoLProps?.show && (
          <EoL
            ref={EoLRef}
            showLoader={EoLProps?.showLoader}
            onVisible={EoLProps?.onVisible}
            config={{
              threshold: 0.1,
              root: EoLRef?.current?.parentElement?.parentElement || null,
            }}
          />
        )}
      </MUISelect>

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
