import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type IconInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "alt"
> & {
  alt?: string;
  icon: IconProp;
  iconProps?: Omit<FontAwesomeIconProps, "icon">;
};

export function IconInput({
  icon,
  iconProps = {},
  alt,
  className,
  ...inputProps
}: IconInputProps) {
  const resolvedIconProps: FontAwesomeIconProps = {
    ...iconProps,
    icon,
    className:
      "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none " +
      (iconProps.className ?? ""),
    size: iconProps.size ?? "lg",
    "aria-hidden": true,
  };

  return (
    <div className="relative">
      <input
        className={`write-section pr-9! ${className ?? ""}`}
        aria-label={alt}
        {...inputProps}
      />
      <FontAwesomeIcon {...resolvedIconProps} />
    </div>
  );
}
