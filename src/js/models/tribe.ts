import { Group } from "./group";

export enum SessionStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  NOT_STARTED = "NOT_STARTED",
}

export interface TribeGroupUsers {
  group_id: number;
  users: TribeUser[];
}
export interface TribeUser {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface Tribe extends PartialTribe {
  groups: Group[];
}

export interface PartialTribe {
  id: number;
  name: string;
  background_preference?: string;
  group_count: number;
  user_count: number;
  is_active: boolean;
  owner_id: number;
}

export interface CreateTribe {
  name: string;
}

export interface TribeCheckpoint {
  session_name: string;
  group_sessions: TribeGroupCheckpoint[];
}

export interface TribeGroupCheckpoint {
  group_id: number;
  status: SessionStatus;
  session?: TribeCheckpointSession | null;
}

export interface TribeCheckpointSession {
  session_id: number;
  started_time: string;
  presences: TribeCheckpointPresence[];
  average_stars: string | null;
}

export interface TribeCheckpointPresence {
  presence: string;
  name: string;
}

export interface TribeCheckpointDates {
  from_date: string;
  to_date: string;
  dates: string[];
}
