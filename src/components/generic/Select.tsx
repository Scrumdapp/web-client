import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import { cn } from "../../js/utils/tw.ts";

export interface SelectOption<T> {
  value: T;
  label: string;
  className?: string;
}

interface SelectProps<T> {
  label: string;
  hideLabel?: boolean;
  labelClassName?: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  buttonContent?: ReactNode;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  className?: string;
  chevronClassName?: string;
  disabled?: boolean;
}

export function Select<T>({
  label,
  hideLabel = false,
  labelClassName,
  value,
  onChange,
  options,
  buttonContent,
  buttonClassName,
  optionsClassName,
  optionClassName,
  className,
  chevronClassName,
  disabled,
}: SelectProps<T>) {
  const selected = options.find((opt) => opt.value === value);

  return (
    <Field disabled={disabled} className={cn("relative w-full", className)}>
      <Label
        className={cn(hideLabel ? "sr-only" : "block mb-1", labelClassName)}
      >
        {label}
      </Label>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <ListboxButton
          className={cn(
            "btn-attendance border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            buttonClassName,
          )}
        >
          {buttonContent ?? (
            <span className={cn("text-left truncate", selected?.className)}>
              {selected?.label}
            </span>
          )}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cn("shrink-0", chevronClassName)}
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className={cn(
            "absolute z-10 mt-2 border rounded-md bg-bg_h w-full py-1 focus:outline-none",
            optionsClassName,
          )}
        >
          {options.map((opt, i) => (
            <ListboxOption
              key={i}
              value={opt.value}
              className={cn(
                "btn-attendance-dropdown py-1",
                optionClassName,
                opt.className,
              )}
            >
              {opt.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
