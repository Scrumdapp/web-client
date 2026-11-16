import { IFrame, StompSubscription } from "@stomp/stompjs";

export type StompdappSubscriptionCallback = (data: any) => void;
export enum StompdappSubscriptionStatus {
  Subscribed,
  ClientDisconnected,
  Unsubscribed,
}

export class StompdappSubscription {
  readonly topic: string;
  readonly headers: Record<string, string>;
  readonly callback: StompdappSubscriptionCallback;

  subscription: StompSubscription | null = null;
  status: StompdappSubscription = StompdappSubscriptionStatus.Unsubscribed;

  constructor(
    topic: string,
    headers: Record<string, string>,
    callback: StompdappSubscriptionCallback,
  ) {
    this.topic = topic;
    this.headers = headers;
    this.callback = callback;
  }

  handeCallback(frame: IFrame) {}
}
