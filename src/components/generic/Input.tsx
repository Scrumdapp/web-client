import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../js/utils/tw.ts";

type InputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "className" | "id"
> & {
  label: string;
  hideLabel?: boolean;
  labelClassName?: string;
  className?: string;
  inputClassName?: string;
  describedBy?: string;
  invalid?: boolean;
};

export function Input({
  label,
  hideLabel = false,
  labelClassName,
  className,
  inputClassName,
  describedBy,
  invalid,
  disabled,
  ...props
}: InputProps) {
  return (
    <Field disabled={disabled} className={cn("relative w-full", className)}>
      <Label
        className={cn(hideLabel ? "sr-only" : "block mb-1", labelClassName)}
      >
        {label}
      </Label>
      <HeadlessInput
        {...props}
        disabled={disabled}
        invalid={invalid}
        aria-describedby={describedBy}
        className={cn("disabled:opacity-50", inputClassName)}
      />
    </Field>
  );
}
