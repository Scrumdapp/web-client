import { useEffect } from "react";
import { useStompdapp } from "./stompdappContext";
import {
  StompdappListener,
  StompdappSubscriberProducerFactory,
} from "./stompdappSubscriberFactory";

export function useStompdappSubscription<TOutput>(
  producerFactory: StompdappSubscriberProducerFactory<TOutput>,
  callback: StompdappListener<TOutput>,
) {
  const client = useStompdapp();

  useEffect(() => {
    const subscriber = producerFactory(callback);
    client.subscribe(subscriber);
    return () => client.unsubscribe(subscriber);
  }, [producerFactory.identity]);
}
