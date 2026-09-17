import { useEffect } from "react";
import { EventChannel, EventListener } from "./eventChannel";


export function useEventChannel<T>(channel: EventChannel<T>, listener: EventListener<T>, dependencies: any[]) {

    useEffect(() => {
        channel.subscribe(listener)
        return () => { channel.unsubscribe(listener) }
    }, [channel, ...dependencies])

}
