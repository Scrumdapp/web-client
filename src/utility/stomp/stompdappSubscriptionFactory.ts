import { StompdappSubscriber } from "./stompdappSubscription"

export type StompdappListener<T> = (cb: T) => void
export type StompdappSubscriberFactoryFn<TInput extends any[], TOutput> = (...inputs: [...TInput, cb: StompdappListener<TOutput>]) => StompdappSubscriber

export type StompdappSubscriberProducer<TOutput> = (cb: StompdappListener<TOutput>) => StompdappSubscriber
export type StompdappSubscriberFactory<TInput extends any[], TOutput> = (...inputs: TInput) => StompdappSubscriberProducer<TOutput>

export class StompdappSubscriberFactoryBuilder<TInput extends any[], TOutput> {
  private fn: StompdappSubscriberFactoryFn<TInput, TOutput>

  constructor(fn: StompdappSubscriberFactoryFn<TInput, TOutput>) {
    this.build = this.build.bind(this)
    this.fn = fn
  }

  build(): StompdappSubscriberFactory<TInput, TOutput> {
    return (...inputs: TInput) => (cb: StompdappListener<TOutput>) => this.fn(...inputs, cb)
  }
}
