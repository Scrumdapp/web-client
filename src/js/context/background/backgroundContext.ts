import {createContext} from "react";

export type BackgroundId = number

export interface BackgroundOverride {
    id: BackgroundId
    background: string
    priority: number
}

export class BackgroundChangedEvent extends Event {
    static eventName: string = "BackgroundChangedEvent";
    background: string | null

    constructor(background: string | null) {
        super(BackgroundChangedEvent.eventName);
        this.background = background;
    }
}

export class BackgroundContext extends EventTarget{
    currentBackground: string | null = null;
    private backgroundOverrides: Map<BackgroundId, BackgroundOverride> = new Map();
    private lastId: number = 0;

    constructor() {
        super();
    }

    addBackgroundOverride(priority: number, background: string): BackgroundId {
        const id = ++this.lastId;
        this.backgroundOverrides.set(id, { id: id, background: background, priority: priority })
        this.calculateNewBackground()
        return id;
    }

    removeBackgroundOverride(id: BackgroundId) {
        if (!this.backgroundOverrides.delete(id)) return;
        this.calculateNewBackground()
    }

    private calculateNewBackground() {
        let bg: string | null = null
        let prio = -999999999
        for (let [ _, data ] of this.backgroundOverrides) {
            if (prio > data.priority) { continue }
            prio = data.priority
            bg = data.background
        }

        if (bg == this.currentBackground) return
        this.currentBackground = bg;
        this.dispatchEvent(new BackgroundChangedEvent(bg))
    }
}

export const backgroundContext = createContext<BackgroundContext | null>(null)