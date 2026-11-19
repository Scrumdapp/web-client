import { SessionStatus } from "../models/tribe";
import {
  faCircleCheck,
  faPlayCircle,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

export const tribeCheckpointStatusOptions = [
  {
    labelKey: "checkpoint.tribe.session.open",
    value: "OPEN",
    color: "text-orange",
    icon: faPlayCircle,
  },
  {
    labelKey: "checkpoint.tribe.session.closed",
    value: "CLOSED",
    color: "text-green",
    icon: faCircleCheck,
  },

  {
    labelKey: "checkpoint.tribe.session.notStarted",
    value: "NOT_STARTED",
    color: "text-gray",
    icon: faCircleXmark,
  },
];

export function getTribeCheckpointStatusColor(value: SessionStatus) {
  return (
    tribeCheckpointStatusOptions.find((opt) => opt.value === value)?.color ??
    "text-gray"
  );
}

export function getTribeCheckpointStatus(value: SessionStatus) {
  return (
    tribeCheckpointStatusOptions.find((opt) => opt.value === value) ?? {
      labelKey: "checkpint.tribe.session.unknown",
      value: "UNKNOWN",
      color: "text-gray",
      icon: faCircleXmark,
    }
  );
}
