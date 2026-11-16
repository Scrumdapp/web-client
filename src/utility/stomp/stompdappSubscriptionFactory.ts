import { StompdappSubscriber } from "./stompdappSubscription";

export type StompdappListener<T> = (cb: T) => void;
export type StompdappSubscriberProducer<TInput extends unknown[], TOutput> = (...inputs: [...TInput, cb: StompdappListener<TOutput>]) => StompdappSubscriber;

export type StompdappSubscriberProducerFactory<TOutput> = ((cb: StompdappListener<TOutput>) => StompdappSubscriber) & { identity: string };
export type StompdappSubscriberFactory<TInput extends unknown[], TOutput> = (...inputs: TInput) => StompdappSubscriberProducerFactory<TOutput>;

export function stompdappSubscriberFactoryBuilder<
  TInput extends unknown[],
  TOutput,
>(
  fn: StompdappSubscriberProducer<TInput, TOutput>,
): StompdappSubscriberFactory<TInput, TOutput> {
  return (...inputs: TInput) =>
    stompdappSubscriberProducerFactoryBuilder(inputs, fn);
}

export function stompdappSubscriberProducerFactoryBuilder<
  TInput extends unknown[],
  TOutput,
>(
  inputs: TInput,
  fn: StompdappSubscriberProducer<TInput, TOutput>,
): StompdappSubscriberProducerFactory<TOutput> {
  const product = ((cb: StompdappListener<TOutput>) =>
    fn(...inputs, cb)) as StompdappSubscriberProducerFactory<TOutput>;
  product.identity = JSON.stringify(inputs);

  return product;
}
