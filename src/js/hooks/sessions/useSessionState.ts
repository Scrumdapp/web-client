import {useCallback, useMemo, useRef, useState} from "react";

type InvalidateKey =
    | { type: "sessions" }
    | { type: "session"; id: number }
    | { type: "checkpoints"; sessionId: number };

export function useSessionStateContext() {

    const [expanded, setExpanded] = useState<Set<number>>(() => new Set());
    const onToggleRef = useRef<(() => void)>(null);

    const [versions, setVersions] = useState<Record<string, number>>({});

    const isExpanded = useCallback((id: number) => expanded.has(id), [expanded])

    const setOnToggle = useCallback((cb: () => void) => {
        onToggleRef.current = cb;
    }, []);

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
        onToggleRef.current?.();
    }, []);

    const closeAll = useCallback(() => setExpanded(new Set()), []);

    const keyToString = (key: InvalidateKey) => {
        switch (key.type) {
            case "sessions":
                return "sessions";
            case "session":
                return `session:${key.id}`;
            case "checkpoints":
                return `checkpoints:${key.sessionId}`;
        }
    }

    const invalidate = useCallback((keys: InvalidateKey[]) => {
        setVersions(prev => {
            const next = {...prev};

            for (const key of keys) {
                const keyStr = keyToString(key);
                next[keyStr] = (next[keyStr] ?? 0) + 1;
            }
            return next;
        })
    }, []);

    const useInvalidation = useCallback((key: InvalidateKey) => {
        const keyStr = keyToString(key);
        return versions[keyStr] ?? 0;
    }, [versions]);

    return useMemo(() => ({
            expanded, isExpanded, toggleExpanded, closeAll, useInvalidation, invalidate, onToggle: setOnToggle
        }), [
            expanded, isExpanded, toggleExpanded, closeAll, useInvalidation, invalidate, setOnToggle
        ]
    );
}