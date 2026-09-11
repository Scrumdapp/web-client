import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons/faStar";
import {faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons/faStar";
import {faStarHalfStroke} from "@fortawesome/free-solid-svg-icons";

type StarsProps = {
  amount?: number | null;
  className?: string;
};

export function Stars({ amount, className }: StarsProps) {
  if (amount == null) {
    return (
        <span className={className}>
        <span className="text-gray">---</span>
      </span>
    );
  }

  return (
      <span className={`stars flex-wrap${className ? ` ${className}` : ""}`}>
      {[1, 2, 3, 4, 5].map((starPosition) => {
        const iconName =
            amount >= starPosition
                ? faStarSolid
                : amount >= starPosition - 0.5
                    ? faStarHalfStroke
                    : faStarOutline;

        const isEmpty = iconName === faStarOutline;

        return (
            <FontAwesomeIcon
                key={starPosition}
                icon={iconName}
                className={`icon${isEmpty ? " text-fg4" : ""}`}
            />
        );
      })}
    </span>
  );
}

export default Stars;