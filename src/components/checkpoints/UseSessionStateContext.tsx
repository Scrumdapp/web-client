import {ReactNode, useCallback, useContext, useMemo, useState} from "react";
import SessionStateContext from "./SessionStateContext.tsx";

export function SessionStateProvider({ state, children }: {
    state: ReturnType<typeof useSessionStateContext>
    children: ReactNode
}) {
    return (
        <SessionStateContext.Provider value={state}>
            {children}
        </SessionStateContext.Provider>
    )
}

export function useSessionStateContext() {
    
    const [expanded, setExpanded] = useState<Set<number>>(() => new Set());
    const [onToggleCb, setOnToggleCb] = useState<(() => void) | null>(null)

    const [refreshSessionKey, setRefreshSessionKey] = useState(0);
    const [refreshCheckpointsKey, setRefreshCheckpointsKey] = useState(-1);

    const isExpanded = useCallback((id: number) => expanded.has(id), [expanded])

    const toggleExpanded = useCallback((id: number) => {
        setExpanded(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        })
        onToggleCb?.()
    }, [onToggleCb]);

    const closeAll = useCallback(() => setExpanded(new Set()), []);

    const refreshSessions = useCallback(() => setRefreshSessionKey(k => k + 1), []);

    const refreshCheckpoints = useCallback((id: number) => setRefreshCheckpointsKey(id), [])

    return useMemo(() => ({
            expanded, isExpanded, toggleExpanded, closeAll, refresh: refreshSessions, refreshCheckpoints, refreshSessionKey, refreshCheckpointsKey, onToggle: setOnToggleCb
        }), [
            expanded, isExpanded, toggleExpanded, closeAll, refreshSessions, refreshCheckpoints, refreshSessionKey, refreshCheckpointsKey, setOnToggleCb
        ]
    );
}

export function useSessionState() {
    const ctx = useContext(SessionStateContext);
    if (!ctx) {
        throw new Error("Session state context was not set, ensure it is actually provided.")
    }

    return ctx
}