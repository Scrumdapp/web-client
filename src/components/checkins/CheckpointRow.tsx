import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SessionCheckpointRow } from "./checkpointUserMapper";
import {
  getAttendanceColor,
  getAttendanceLabelKey,
  getStarsColor,
} from "../../js/utils/colorUtils";
import Stars from "./checkpointcomponents/Stars";
import { useTranslation } from "react-i18next";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

export function CheckpointRow({
  checkpoint,
  canEdit,
}: {
  checkpoint: SessionCheckpointRow;
  canEdit: boolean;
}) {
  const { t } = useTranslation();

  return (
    <tr className="align-top">
      <td className="p-2 text-left name-field border-r border-t border-dotted border-current! max-h-14">
        {checkpoint.first_name} {checkpoint.last_name}
      </td>
      <td className="text-left p-2 border-t border-dotted border-current">
        <div className={getAttendanceColor(checkpoint.presence)}>
          {t(getAttendanceLabelKey(checkpoint.presence))}
        </div>
      </td>
      <td className="p-2 border-t border-dotted border-current">
        <div
          className={`flex justify-center checkpoints-center ${getStarsColor(checkpoint.stars)}`}
        >
          <Stars amount={checkpoint.stars} />
        </div>
      </td>
      <td className="p-2 break-words border-t border-dotted hidden lg:table-cell">
        <p className="break-words line-clamp-2">{checkpoint.comment}</p>
      </td>
      <td className="p-2 break-words border-t border-dotted hidden lg:table-cell">
        <p className="break-words line-clamp-2">{checkpoint.impediment}</p>
      </td>
      <td className="border-t border-dotted py-2 horizontal gap-1 md:gap-2">
        <button
          className="btn p-1 md:p-2 border aspect-square ml-auto mr-0 mt-0"
          onClick={() => openReadOnly(checkpoint)}
        >
          <FontAwesomeIcon icon={faEye} className="icon text-blue" />
        </button>
        {canEdit && (
          <button
            className="btn p-1 md:p-2 border aspect-square ml-auto mr-0 mt-0"
            onClick={() => openEdit(checkpoint)}
          >
            <FontAwesomeIcon icon={faPencil} className="icon text-blue" />
          </button>
        )}
      </td>
    </tr>
  );
}
