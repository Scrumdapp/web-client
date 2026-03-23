import {FC} from "react";

type StarsProps = {
  amount?: number | null;
  className?: string;
};

const Stars: FC<StarsProps> = ({ amount, className }) => {
  if (amount == null) {
    return (
      <span className={className}>
        <span className="text-gray">---</span>
      </span>
    );
  }

  return (
    <span className={`stars${className ? ` ${className}` : ""}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const iconName =
          (i - 1) * 2 + 1 > amount
            ? "star_outline"
            : i * 2 > amount
              ? "star_half"
              : "star";

        return (
          <span key={i} className="icon material-icons-outlined">
            {iconName}
          </span>
        );
      })}
    </span>
  );
};

export default Stars;
