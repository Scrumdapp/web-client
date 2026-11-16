import { IFrame } from "@stomp/stompjs"
import { StompdappListener } from "../stompdappSubscriptionFactory"
import { StompdappSubscriptionCallback } from "../stompdappSubscription"

export function jsonBodyConverter<T>(listener: StompdappListener<T>): StompdappSubscriptionCallback {
  return (frame: IFrame) => {
    if (frame.isBinaryBody) throw new Error("Frame body must not be binary")
    if (!("content-type" in frame.headers)) throw new Error("Content-type header was not found in the body")
    if (frame.headers["content-type"].toLowerCase() != "application/json") throw new Error("Body is not of type application/json")
    const json = JSON.parse(frame.body)
    listener(json as T)
  }
}
