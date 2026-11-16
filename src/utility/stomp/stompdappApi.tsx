import { StompdappSubscription } from "./stompdappSubscription";
import {
  StompdappSubscriptionFactoryBuilder,
  StompdappListener,
} from "./stompdappSubscriptionFactory";
import { jsonBodyConverter } from "./converters/jsonBodyConverter";

export interface Test {
  userId: number;
}

export const StompdappApi = {
  groupUserAdded: new StompdappSubscriptionFactoryBuilder(
    (groupId: number, cb: StompdappListener<Test>) =>
      new StompdappSubscription(
        `/groups/${groupId}/users.added`,
        {},
        jsonBodyConverter(cb),
      ),
  ).build(),
};
