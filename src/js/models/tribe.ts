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
  icon_preference?: string;
}

export interface PartialTribe {
  id: number;
  name: string;
  background_preference?: string;
  group_count: number;
  is_active: boolean;
}

export interface CreateTribe {
  name: string;
}
