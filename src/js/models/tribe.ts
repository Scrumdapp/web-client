import { Group } from "./group";

export type Feature =
  | "checkins"
  | "checkins.presence"
  | "checkins.presence_comment"
  | "checkins.checkin_stars"
  | "checkins.checkup_stars"
  | "checkins.checkout_stars"
  | "checkins.checkin_comment"
  | "checkins.checkup_comment"
  | "checkins.checkout_comment"
  | "checkins.obstacle_comment";

export interface Tribe extends PartialTribe {
  groups: Group[];
}

export interface PartialTribe {
  id: number;
  name: string;
  background_preference?: string;
  group_count: number;
  member_count: number;
  is_active: boolean;
  owner_id: number;
}

export interface CreateTribe {
  name: string;
}
