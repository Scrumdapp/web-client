import { createContext } from "react";
import { GroupUser } from "../../js/models/group";
import { EventChannel } from "../../js/events/eventChannel";

export class GroupUsersContextData {
  users: GroupUser[] | null = null;
  refresh: () => Promise<GroupUser[]>;

  readonly usersUpdated = new EventChannel<GroupUser[]>();

  constructor(refresh: () => Promise<GroupUser[]>) {
    this.refresh = refresh;
  }

  setRefresh(refresh: () => Promise<GroupUser[]>) {
    this.refresh = refresh;
  }
}

export const groupUserContext = createContext<GroupUsersContextData | null>(
  null,
);
