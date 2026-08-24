import { useCallback, useState } from "react";
import { ApiError } from "./api/apiError";
import { GroupUser } from "../models/group";
import {getGroupUsers} from "./api/routes/groupUserRoutes.tsx";

export function useUserManagement(groupId: number) {
    const [rows, setRows] = useState<GroupUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);


    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const users = await getGroupUsers()(groupId);
            setRows(users);
        } catch (err) {
            setError(
                err instanceof ApiError
                    ? err
                    : new ApiError(999, "Unhandled error", err as Error)
            );
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    return { rows, loading, error, fetch };
}