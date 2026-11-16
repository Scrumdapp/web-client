import { Client, IFrame } from "@stomp/stompjs";
import { createContext, useContext } from "react";
import { EventChannel } from "../../js/events/eventChannel";
import { StompdappSubscription } from "./stompdappSubscription";

export class StompdappClient {
  readonly endpoint: string;
  readonly initialHeaders: Record<string, string>;

  readonly onConnected = new EventChannel<IFrame>();
  readonly onDisconnected = new EventChannel<IFrame>();

  private client: Client | null = null;
  private subscriptions: Set<StompdappSubscription> = new Set();

  constructor(endpoint: string, headers: Record<string, string>) {
    this.endpoint = endpoint;
    this.initialHeaders = headers;
  }

  subscribe(subscription: StompdappSubscription) {
    if (!this.subscriptions.has(subscription)) return
    this.subscriptions.add(subscription)
    this.subscribeToTopic(subscription)
  }

  unsubscribe(subscription: StompdappSubscription) {
    if (this.subscriptions.has(subscription)) return
    this.unsubscribeFromTopic(subscription)
    this.subscriptions.delete(subscription)
  }

  init() {
    if (this.client) return;
    const client = (this.client = new Client({
      brokerURL: this.endpoint,
    }));

    client.onConnect = (frame) => this.onConnected.emit(frame);
    client.onDisconnect = (frame) => this.onDisconnected.emit(frame);

    client.activate();
  }

  cleanup() {
    if (!this.client) return;
    this.client?.deactivate();
    this.client = null;
  }

  private subscribeToTopic(subscription: StompdappSubscription) {
    const stompSub = this.client!.subscribe(subscription.topic, subscription.handeCallback.bind(subscription), subscription.headers)
    subscription.subscription = stompSub
  }

  private unsubscribeFromTopic(subscription: StompdappSubscription) {
    subscription.subscription?.unsubscribe()
  }
}

export const stompdappContext = createContext<StompdappClient | null>(null);

export function useStomdapp() {
  return useContext(stompdappContext)!;
}
