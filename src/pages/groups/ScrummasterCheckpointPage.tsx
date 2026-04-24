import { useGroup } from "../../js/context/group/useGroup.ts";
import { useSearchParams } from "react-router-dom";
import { toScrumdappDate } from "../../js/utils/scrumdappDate.ts";
import { ScrummasterCheckpointTable } from "../../components/checkins/ScrummasterCheckpoint.tsx";

export function ScrummasterCheckpointPage() {
  const group = useGroup();

  const [searchParams] = useSearchParams();
  const date = searchParams.get("date") ?? toScrumdappDate(new Date());
  const sessionParam = searchParams.get("session");
  const sessionId = sessionParam ? Number(sessionParam) : undefined;

  return (
    <ScrummasterCheckpointTable
      groupId={group.id}
      date={date}
      sessionId={Number.isNaN(sessionId) ? undefined : sessionId}
    />
  );
}
