
export type EventListener<T> = (event: T) => any | void


export class EventChannel<T> {

    private listeners: EventListener<T>[] = []

    /**
     * @returns false when event is already registered
     */
    subscribe(listener: EventListener<T>): boolean {
        if (this.listeners.find(it => it == listener)) return false
        this.listeners.push(listener)
        return true
    }


    /**
     * @returns true when the listener has been removed
     */
    unsubscribe(listener: EventListener<T>): boolean {
        const index = this.listeners.findIndex(it => it == listener)
        if (index >= 0) {
            this.listeners.splice(index, 1)
        }
        return index != -1
    }

    emit(t: T) {
        for (const listener of this.listeners) {
            listener(t)
        }
    }
}
