import { IFrame, StompSubscription } from "@stomp/stompjs";

export type StompdappSubscribtionCallback = (data: IFrame) => void;
export enum StompdappSubscriberStatus {
  Subscribed,
  ClientDisconnected,
  Unsubscribed,
}

export class StompdappSubscriber {
  readonly topic: string;
  readonly headers: Record<string, string>;
  readonly callback: StompdappSubscribtionCallback;

  subscription: StompSubscription | null = null;
  status: StompdappSubscriberStatus = StompdappSubscriberStatus.Unsubscribed;

  constructor(
    topic: string,
    headers: Record<string, string>,
    callback: StompdappSubscribtionCallback,
  ) {
    this.topic = topic;
    this.headers = headers;
    this.callback = callback;
  }

  handeCallback(frame: IFrame) {
    this.callback(frame);
  }
}
