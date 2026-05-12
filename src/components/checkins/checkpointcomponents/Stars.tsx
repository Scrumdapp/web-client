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
      {[1, 2, 3, 4, 5].map((i) => {
        const iconName =
          (i - 1) * 2 + 1 > amount
            ? faStarOutline
            : i * 2 > amount
              ? faStarHalfStroke
              : faStarSolid;

        return (
            <FontAwesomeIcon icon={iconName} className="icon" />
        );
      })}
    </span>
  );
}

export default Stars;
