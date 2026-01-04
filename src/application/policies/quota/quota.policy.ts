export abstract class QuotaPolicy<T> {
    abstract canConsume(params: T): boolean;
}