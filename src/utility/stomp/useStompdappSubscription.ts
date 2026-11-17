import { useEffect } from "react";
import { useStomdapp } from "./stompdappContext";
import { StompdappListener, StompdappSubscriberProducerFactory } from "./stompdappSubscriberFactory";

export function useStompdappSubscription<TOutput>(
  producerFactory: StompdappSubscriberProducerFactory<TOutput>,
  callback: StompdappListener<TOutput>)
{
  const ctx = useStomdapp()

  useEffect(() => {
    const subscriber = producerFactory(callback)
    ctx.subscribe(subscriber)
    return () => ctx.unsubscribe(subscriber)
  }, [producerFactory.identity])
}
