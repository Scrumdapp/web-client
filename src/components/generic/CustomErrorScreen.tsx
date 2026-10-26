import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const CustomErrorScreen = ({
  errorTitle,
  errorDescription,
}: {
  errorTitle: string;
  errorDescription: string;
}) => {
  return (
    <div className="center fade-in">
      <div className="flex w-20 h-20 items-center justify-center border rounded-full mb-8">
        <FontAwesomeIcon icon={faTriangleExclamation} size={"2x"} />
      </div>
      <h2>{errorTitle}</h2>
      <p>{errorDescription}</p>
    </div>
  );
};

export default CustomErrorScreen;
