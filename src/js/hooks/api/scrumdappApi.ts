import * as UserRoutes from "./routes/userRoutes.tsx"
import * as GroupRoutes from "./routes/groupRoutes.tsx"
import * as GroupUserRoutes from "./routes/groupUserRoutes.tsx"
import * as GroupSessionRoutes from "./routes/groupSessions.tsx"
import * as GroupCheckpointRoutes from "./routes/groupCheckpointRoutes.tsx"

export const ScrumdappApi = {
    ...UserRoutes,
    ...GroupRoutes,
    ...GroupUserRoutes,
    ...GroupSessionRoutes,
    ...GroupCheckpointRoutes
}
