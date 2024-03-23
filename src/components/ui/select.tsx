"use client";

import { ReactPropTypes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { LuChevronDown, LuTrash2, LuUserCog2 } from "react-icons/lu";

import { cn } from "@/lib/utils";

import AddNewCategory from "@/components/ui/add-new-category";
import { IconType } from "react-icons/lib";

export type Options = {
  readonly value: string;
  readonly label: string;
};

interface SelectProps {
  name: string;
  register: UseFormRegisterReturn;
  value: string;
  setSelectValue: React.Dispatch<React.SetStateAction<any>>;
  error?: string;
  disabled?: boolean;
  options: Options[];
  setOptions?: React.Dispatch<React.SetStateAction<Options[]>>;
  props?: ReactPropTypes;
  className?: string;
  selectLabel: string;
  Icon?: IconType;
}

const Select = ({
  name,
  value,
  setSelectValue,
  error,
  disabled,
  register,
  options,
  setOptions,
  props,
  className,
  selectLabel,
  Icon,
}: SelectProps) => {
  const [selectOpen, setSelectOpen] = useState(false);

  const handleSelect = (option: Options) => {
    setSelectValue(option.label);
    register.onChange({ target: { name, value: option.value } });
    setSelectOpen(false);
  };

  return (
    <div
      className={cn(
        "w-full relative mb-8 flex flex-col items-start gap-2 ",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <label
        htmlFor="SelectRole"
        className={cn(
          "text-primary-foreground cursor-pointer ",
          error && "text-destructive opacity-80",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {selectLabel}
      </label>

      <div
        className="flex items-center w-full"
        onClick={() => setSelectOpen((currValue) => !currValue)}
      >
        {Icon ? (
          <Icon className="absolute left-2 pointer-events-none h-5 w-5 text-secondary-foreground" />
        ) : (
          <LuUserCog2 className="absolute left-2 pointer-events-none h-5 w-5 text-secondary-foreground" />
        )}

        <div
          {...props}
          className={cn(
            "w-full h-full py-4 px-10 bg-transparent border rounded-md text-left text-primary-foreground placeholder:text-secondary-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer capitalize",
            error
              ? "border-destructive focus:border-destructive"
              : "border-input focus:border-secondary-foreground",
            className
          )}
          {...register}
        >
          {value}
        </div>
        <LuChevronDown className="absolute right-2 cursor-pointer pr-4 h-9 w-9 text-secondary-foreground " />
      </div>
      {error && <div className="mb-4 text-destructive italic">{error}</div>}

      <div
        className={cn(
          "w-full h-fit bg-card absolute left-0 top-24 my-2 py-2 rounded-md text-left duration-300 z-50",
          selectOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-5 opacity-0 pointer-events-none"
        )}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="py-3 hover:bg-accent/60 cursor-pointer rounded-md px-10 duration-300 m-2 capitalize flex justify-between group"
          >
            <p
              onClick={() => handleSelect(option)}
              className="flex-1 group-hover:text-primary"
            >
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
