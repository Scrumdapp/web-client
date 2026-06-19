import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type IconInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon: IconProp,
  iconProps?: Omit<FontAwesomeIconProps, "icon">
}

export function IconInput({ icon, iconProps = {}, className, ...inputProps }: IconInputProps) {

  // @ts-ignore
  iconProps.icon = icon;
  iconProps.className = "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" + (iconProps.className ?? "")
  iconProps.size = iconProps.size ?? "lg"

  return (
    <div className="relative">
      <input className={`write-section pr-9! ${className ?? ""}`} {...inputProps} alt="search" />
      { /* @ts-ignore */}
      <FontAwesomeIcon {...(iconProps)} />
    </div>
  )
}