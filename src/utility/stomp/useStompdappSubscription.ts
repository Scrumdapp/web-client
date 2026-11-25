import { useEffect } from "react";
import {
  StompdappListener,
  StompdappSubscriberProducerFactory,
} from "./stompdappSubscriberFactory";
import { useStompdapp } from "./stompdappContext";

export function useStompdappSubscription<TOutput>(
  producerFactory: StompdappSubscriberProducerFactory<TOutput>,
  callback: StompdappListener<TOutput>,
) {
  const ctx = useStompdapp();

  useEffect(() => {
    const subscriber = producerFactory(callback);
    ctx.subscribe(subscriber);
    return () => ctx.unsubscribe(subscriber);
  }, [producerFactory.identity]);
}
