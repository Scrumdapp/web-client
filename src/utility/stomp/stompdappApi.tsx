import { StompdappSubscriber } from "./stompdappSubscription";
import {
  stompdappSubscriberFactoryBuilder,
  StompdappListener,
} from "./stompdappSubscriberFactory";
import { jsonBodyConverter } from "./converters/jsonBodyConverter";

export interface Test {
  userId: number;
}

export const StompdappApi = {
  groupUserAdded: stompdappSubscriberFactoryBuilder(
    (groupId: number, cb: StompdappListener<Test>) =>
      new StompdappSubscriber(
        `/groups/${groupId}/users.added`,
        {},
        jsonBodyConverter(cb),
      ),
  ),
};
